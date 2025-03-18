package mysql

import "github.com/markuslippo/CodeSprint/database"

func (m *MySQLDB) RegisterUser(username string) error {
	_, err := m.db.Exec("INSERT INTO Users (username) VALUES (?)", username)
	return err
}

func (m *MySQLDB) GetUsers() ([]database.User, error) {
	var users []database.User

	rows, err := m.db.Query("SELECT id, username FROM Users")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var user database.User
		if err := rows.Scan(&user.ID, &user.Username); err != nil {
			return nil, err
		}
		users = append(users, user)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return users, nil
}
