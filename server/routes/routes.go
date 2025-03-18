package routes

import (
	"github.com/labstack/echo/v4"
	"github.com/markuslippo/CodeSprint/database"
	"github.com/markuslippo/CodeSprint/handlers"
)

func SetupRoutes(e *echo.Echo, db database.Database) {
	h := handlers.NewHandler(db)

	e.POST("/register", h.RegisterHandler)
	e.GET("/users", h.GetUsers)
}
