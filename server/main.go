package main

import (
	"fmt"
	"log"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/markuslippo/CodeSprint/config"
	"github.com/markuslippo/CodeSprint/database/mysql"
	"github.com/markuslippo/CodeSprint/routes"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	cfg := config.LoadConfig()

	mysqlDB, err := mysql.NewMySQLDB()
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	defer mysqlDB.Close()

	e := echo.New()

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{echo.GET, echo.POST, echo.PUT, echo.DELETE},
		AllowHeaders:     []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept, echo.HeaderAuthorization},
		AllowCredentials: true,
		ExposeHeaders:    []string{"Authorization"},
	}))

	e.Use(func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			c.Response().Header().Set("Cross-Origin-Opener-Policy", "same-origin-allow-popups")
			c.Response().Header().Set("Cross-Origin-Embedder-Policy", "require-corp")
			return next(c)
		}
	})

	routes.SetupRoutes(e, mysqlDB)

	port := cfg.Port
	log.Printf("Server running on port %s", port)
	e.Logger.Fatal(e.Start(fmt.Sprintf("localhost:%s", port)))
}
