package mysql

import (
	"database/sql"
	"fmt"

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

func (m *MySQLDB) RegisterUser(name string, email string) (*database.User, error) {
	fmt.Println("Registering user", name, email)
	result, err := m.db.Exec("INSERT INTO users (name, email) VALUES (?, ?)", name, email)
	if err != nil {
		return nil, err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return nil, err
	}

	user := database.User{
		ID:    int(id),
		Name:  name,
		Email: email,
	}
	return &user, nil
}

func (m *MySQLDB) GetUsers() ([]database.User, error) {
	var users []database.User

	rows, err := m.db.Query("SELECT id, name, email FROM users")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var user database.User
		if err := rows.Scan(&user.ID, &user.Name, user.Email); err != nil {
			return nil, err
		}
		users = append(users, user)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return users, nil
}
