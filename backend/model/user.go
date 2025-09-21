package model

type User struct {
	UserID   string `gorm:"primaryKey;size:8"`
	Email    string `gorm:"unique"`
	Password string
	Role     string // "admin" หรือ "candidate"
}
