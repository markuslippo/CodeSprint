package config

import (
	"os"
)

type Config struct {
	GoogleClientID string
	JWTSecret      string
	Port           string
}

func LoadConfig() Config {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	return Config{
		GoogleClientID: os.Getenv("GOOGLE_CLIENT_ID"),
		JWTSecret:      os.Getenv("JWT_SECRET"),
		Port:           port,
	}
}
