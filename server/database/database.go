package database

type Database interface {
	RegisterUser(username string) error
	GetUsers() ([]User, error)
}

type User struct {
	ID       int    `json:"id,omitempty"`
	Username string `json:"username"`
}
