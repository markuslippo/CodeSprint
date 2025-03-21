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
	e.GET("/auth/me", h.AuthCheckHandler)
	e.POST("/auth/google", h.GoogleAuthHandler)
	e.GET("/auth/refresh", h.RefreshTokenHandler)
	e.POST("/auth/logout", h.LogoutHandler)

	// User Routes
	e.GET("/users", h.GetUsers, middleware.AuthMiddleware)
}
