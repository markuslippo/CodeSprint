package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func (h *Handler) GetUsers(c echo.Context) error {
	users, err := h.DB.GetUsers()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Failed to fetch users"})
	}

	return c.JSON(http.StatusOK, users)
}
