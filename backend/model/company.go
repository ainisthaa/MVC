package model

type Company struct {
	CompanyID string `gorm:"primaryKey;size:8"`
	Name      string
	Email     string
	Location  string
	Jobs      []Job `gorm:"foreignKey:CompanyID"`
}
