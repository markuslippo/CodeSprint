package main

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/markuslippo/CodeSprint/database/mysql"
	"github.com/markuslippo/CodeSprint/routes"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	mysqlDB, err := mysql.NewMySQLDB()

	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	defer mysqlDB.Close()

	e := echo.New()
	routes.SetupRoutes(e, mysqlDB)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server running on port %s", port)
	e.Logger.Fatal(e.Start(fmt.Sprintf("localhost:%s", port)))
}
