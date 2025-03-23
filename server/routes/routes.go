package routes

import (
	"github.com/labstack/echo/v4"
	"github.com/markuslippo/CodeSprint/database"
	"github.com/markuslippo/CodeSprint/handlers"
	"github.com/markuslippo/CodeSprint/middleware"
)

func SetupRoutes(e *echo.Echo, db database.Database) {
	h := handlers.NewHandler(db)

	// Auth
	e.GET("/auth/me", h.AuthenticationCheck)
	e.POST("/auth/google", h.GoogleAuthentication)
	e.GET("/auth/refresh", h.RefreshToken)
	e.GET("/auth/logout", h.Logout)

	e.GET("/coding-task", h.GetCodeTasks, middleware.AuthMiddleware)

}
