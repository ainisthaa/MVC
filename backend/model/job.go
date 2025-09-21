package model

import "time"

type Job struct {
	JobID        string `gorm:"primaryKey;size:8"`
	Title        string
	Description  string
	CompanyID    string
	Deadline     time.Time
	Status       string // "open" or "closed"
	Company      Company
	Applications []Application `gorm:"foreignKey:JobID"`
}
