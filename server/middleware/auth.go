package middleware

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/markuslippo/CodeSprint/utils"
)

func AuthMiddleware(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		cookie, err := c.Cookie("access_token")
		if err != nil {
			return c.JSON(http.StatusUnauthorized, echo.Map{"error": "Authentication required"})
		}

		token := cookie.Value
		email, err := utils.ValidateJWT(token)
		if err != nil {
			return c.JSON(http.StatusUnauthorized, echo.Map{"error": "Invalid token"})
		}
		c.Set("email", email)
		return next(c)
	}
}
