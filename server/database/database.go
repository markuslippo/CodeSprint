package database

type Database interface {
	RegisterUser(name string, email string) (*User, error)
	UserExistsByEmail(email string) (*User, error)

	GetCodingTask(language string, difficulty string) (*CodingTask, error)
}

type User struct {
	ID    string
	Name  string
	Email string
}

type CodingTask struct {
	ID         string
	Language   string
	Difficulty string
	Content    string
}
