package mysql

import "github.com/markuslippo/CodeSprint/database"

func (m *MySQLDB) GetCodingTask(language string, difficulty string) (*database.CodingTask, error) {
	var codingTask database.CodingTask

	err := m.db.QueryRow("SELECT id, language, difficulty, content FROM coding_tasks WHERE language = ? AND difficulty = ? ORDER BY RAND() LIMIT 1", language, difficulty).
		Scan(&codingTask.ID, &codingTask.Language, &codingTask.Difficulty, &codingTask.Content)

	if err != nil {
		return nil, err
	}

	return &codingTask, nil
}
