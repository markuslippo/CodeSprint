package handlers

import (
	"context"
	"fmt"
	"net/http"
	"os"

	"github.com/labstack/echo/v4"
	"github.com/markuslippo/CodeSprint/utils"
	"google.golang.org/api/idtoken"
)

func (h *Handler) AuthenticationCheck(c echo.Context) error {
	fmt.Println("User pinged /auth/me")
	cookie, err := c.Cookie("access_token")
	if err != nil {
		return c.JSON(http.StatusUnauthorized, echo.Map{"error": "No access token provided"})
	}

	tokenStr := cookie.Value
	email, err := utils.ValidateJWT(tokenStr)
	if err != nil {
		return c.JSON(http.StatusUnauthorized, echo.Map{"error": "Invalid or expired token"})
	}

	user, err := h.DB.UserExistsByEmail(email)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Error looking up user"})
	}
	if user == nil {
		return c.JSON(http.StatusUnauthorized, echo.Map{"error": "User no longer exists"})
	}

	return c.JSON(http.StatusOK, echo.Map{
		"user": echo.Map{
			"id":    user.ID,
			"name":  user.Name,
			"email": user.Email,
		},
	})
}

func (h *Handler) GoogleAuthentication(c echo.Context) error {
	var req struct {
		Token string `json:"token"`
	}

	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{"error": "Invalid request"})
	}

	payload, err := idtoken.Validate(context.Background(), req.Token, os.Getenv("GOOGLE_CLIENT_ID"))
	if err != nil {
		return c.JSON(http.StatusUnauthorized, echo.Map{"error": "Invalid Google token"})
	}

	// Google AUTH successful
	email := payload.Claims["email"].(string)

	user, err := h.DB.UserExistsByEmail(email)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "User lookup error"})
	}

	if user == nil {
		// Register user
		name := payload.Claims["name"].(string)
		user, err = h.DB.RegisterUser(name, email)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Registration error"})
		}
		fmt.Println("User registered", user.Name)
	} else {
		fmt.Println("User logged in", user.Name)
	}

	// Issue JWT tokens
	accessToken, err := utils.GenereateAccessToken(user.Email)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Failed to generate access token"})
	}

	refreshToken, err := utils.GenerateRefreshToken(user.Email)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Failed to generate refresh token"})
	}

	c.SetCookie(utils.SetAccessCookie(accessToken))
	c.SetCookie(utils.SetRefreshCookie(refreshToken))

	return c.JSON(http.StatusOK, echo.Map{
		"user": echo.Map{
			"id":    user.ID,
			"name":  user.Name,
			"email": user.Email,
		},
	})
}

func (h *Handler) RefreshToken(c echo.Context) error {
	cookie, err := c.Cookie("refresh_token")
	if err != nil {
		return c.JSON(http.StatusUnauthorized, echo.Map{"error": "No refresh token provided"})
	}

	refreshToken := cookie.Value
	email, err := utils.ValidateJWT(refreshToken)
	if err != nil {
		return c.JSON(http.StatusUnauthorized, echo.Map{"error": "Invalid refresh token"})
	}

	// Generate new access token
	newAccessToken, err := utils.GenereateAccessToken(email)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Failed to generate access token"})
	}

	c.SetCookie(utils.SetAccessCookie(newAccessToken))

	return c.JSON(http.StatusOK, echo.Map{
		"success": true,
	})
}

func (h *Handler) Logout(c echo.Context) error {
	c.SetCookie(utils.ClearCookie("access_token"))
	c.SetCookie(utils.ClearCookie("refresh_token"))
	return c.JSON(http.StatusOK, echo.Map{"success": true})
}
