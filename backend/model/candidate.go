package model

type Candidate struct {
	CandidateID string `gorm:"primaryKey;size:8"`
	FirstName   string
	LastName    string
	Email       string `gorm:"unique"`
	UserID      string
}
