package handlers

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/markuslippo/CodeSprint/database"
)

func (h *Handler) GetCodeTasks(c echo.Context) error {
	lang := c.QueryParam("lang")
	difficulty := c.QueryParam("difficulty")

	if lang == "" || difficulty == "" {
		return c.JSON(http.StatusBadRequest, echo.Map{
			"error": "Missing query parameters",
		})
	}

	fmt.Println("User requested coding task for", lang, difficulty)
	var codingTask *database.CodingTask
	codingTask, err := h.DB.GetCodingTask(lang, difficulty)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Error looking up coding task"})

	}

	return c.JSON(http.StatusOK, echo.Map{
		"coding_task": echo.Map{
			"id":         codingTask.ID,
			"language":   codingTask.Language,
			"difficulty": codingTask.Difficulty,
			"content":    codingTask.Content,
		},
	})
}
