package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func (h *Handler) RegisterHandler(c echo.Context) error {
	var req struct {
		Username string `json:"username"`
	}

	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{"error": "Invalid request body"})
	}

	if err := h.DB.RegisterUser(req.Username); err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Could not register user"})
	}

	return c.JSON(http.StatusCreated, echo.Map{"message": "User registered successfully"})
}

func (h *Handler) GetUsers(c echo.Context) error {
	users, err := h.DB.GetUsers()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Failed to fetch users"})
	}

	return c.JSON(http.StatusOK, users)
}
