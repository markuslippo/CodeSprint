package handlers

import "github.com/markuslippo/CodeSprint/database"

type Handler struct {
	DB database.Database
}

func NewHandler(db database.Database) *Handler {
	return &Handler{DB: db}
}
