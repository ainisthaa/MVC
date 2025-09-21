package model

import "time"

type Application struct {
	JobID       string    `gorm:"primaryKey"`
	CandidateID string    `gorm:"primaryKey"`
	AppliedAt   time.Time `gorm:"autoCreateTime"`

	Job       Job
	Candidate Candidate
}
