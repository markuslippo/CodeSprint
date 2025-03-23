package mysql

import (
	"database/sql"
	"fmt"

	"github.com/google/uuid"
	"github.com/markuslippo/CodeSprint/database"
)

func (m *MySQLDB) UserExistsByEmail(email string) (*database.User, error) {
	var user database.User
	err := m.db.QueryRow("SELECT id, name, email FROM users WHERE email = ?", email).
		Scan(&user.ID, &user.Name, &user.Email)

	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		fmt.Println("Error", err)
		return nil, err
	}
	return &user, nil
}

func (m *MySQLDB) RegisterUser(name, email string) (*database.User, error) {
	id := uuid.New().String()
	_, err := m.db.Exec("INSERT INTO users (id, name, email) VALUES (?, ?, ?)", id, name, email)
	if err != nil {
		return nil, err
	}
	return &database.User{ID: id, Name: name, Email: email}, nil
}
