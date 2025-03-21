package routes

import (
	"github.com/labstack/echo/v4"
	"github.com/markuslippo/CodeSprint/database"
	"github.com/markuslippo/CodeSprint/handlers"
	"github.com/markuslippo/CodeSprint/middleware"
)

func SetupRoutes(e *echo.Echo, db database.Database) {
	h := handlers.NewHandler(db)

	// Auth Routes
	e.POST("/auth/google", h.GoogleAuthHandler)
	e.GET("/auth/refresh", h.RefreshTokenHandler)

	// User Routes (Protected)
	e.GET("/users", h.GetUsers, middleware.AuthMiddleware)
}
