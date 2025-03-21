package database

type Database interface {
	RegisterUser(name string, email string) (*User, error)
	UserExistsByEmail(email string) (*User, error)
	GetUsers() ([]User, error)
}

type User struct {
	ID    int
	Name  string
	Email string
}
