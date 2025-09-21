package seed

import (
	"log"
	"time"

	"github.com/ainisthaa/model"
	"gorm.io/gorm"
)

func SeedData(db *gorm.DB) {
	// check ก่อนว่ามีข้อมูลแล้วหรือยัง
	var count int64
	db.Model(&model.User{}).Count(&count)
	if count > 0 {
		log.Println("⚠️  Seed data already exists, skipping...")
		return
	}

	// ----------------------
	// Users
	// ----------------------
	users := []model.User{
		{UserID: "U000001", Email: "admin@example.com", Password: "admin123", Role: "admin"},
		{UserID: "U000002", Email: "anan@example.com", Password: "1234", Role: "candidate"},
		{UserID: "U000003", Email: "benja@example.com", Password: "1234", Role: "candidate"},
		{UserID: "U000004", Email: "chai@example.com", Password: "1234", Role: "candidate"},
		{UserID: "U000005", Email: "duang@example.com", Password: "1234", Role: "candidate"},
		{UserID: "U000006", Email: "ekkarat@example.com", Password: "1234", Role: "candidate"},
		{UserID: "U000007", Email: "fon@example.com", Password: "1234", Role: "candidate"},
		{UserID: "U000008", Email: "golf@example.com", Password: "1234", Role: "candidate"},
		{UserID: "U000009", Email: "hansa@example.com", Password: "1234", Role: "candidate"},
		{UserID: "U000010", Email: "isara@example.com", Password: "1234", Role: "candidate"},
		{UserID: "U000011", Email: "jane@example.com", Password: "1234", Role: "candidate"},
	}
	db.Create(&users)

	// ----------------------
	// Candidates
	// ----------------------
	candidates := []model.Candidate{
		{CandidateID: "C000001", FirstName: "Anan", LastName: "Suwan", Email: "anan@example.com", UserID: "U000002"},
		{CandidateID: "C000002", FirstName: "Benja", LastName: "Siri", Email: "benja@example.com", UserID: "U000003"},
		{CandidateID: "C000003", FirstName: "Chai", LastName: "Korn", Email: "chai@example.com", UserID: "U000004"},
		{CandidateID: "C000004", FirstName: "Duang", LastName: "Suda", Email: "duang@example.com", UserID: "U000005"},
		{CandidateID: "C000005", FirstName: "Ekkarat", LastName: "Thong", Email: "ekkarat@example.com", UserID: "U000006"},
		{CandidateID: "C000006", FirstName: "Fon", LastName: "Chan", Email: "fon@example.com", UserID: "U000007"},
		{CandidateID: "C000007", FirstName: "Golf", LastName: "Preecha", Email: "golf@example.com", UserID: "U000008"},
		{CandidateID: "C000008", FirstName: "Hansa", LastName: "Wong", Email: "hansa@example.com", UserID: "U000009"},
		{CandidateID: "C000009", FirstName: "Isara", LastName: "Ying", Email: "isara@example.com", UserID: "U000010"},
		{CandidateID: "C000010", FirstName: "Jane", LastName: "Meesuk", Email: "jane@example.com", UserID: "U000011"},
	}
	db.Create(&candidates)

	// ----------------------
	// Companies
	// ----------------------
	companies := []model.Company{
		{CompanyID: "10000001", Name: "TechCorp", Email: "contact@techcorp.com", Location: "Bangkok"},
		{CompanyID: "10000002", Name: "InnoSoft", Email: "hr@innosoft.com", Location: "Chiang Mai"},
	}
	db.Create(&companies)

	// ----------------------
	// Jobs
	// ----------------------
	jobs := []model.Job{
		{JobID: "20000001", Title: "Backend Developer", Description: "Golang Developer", CompanyID: "10000001", Deadline: time.Now().AddDate(0, 1, 0), Status: "open"},
		{JobID: "20000002", Title: "Frontend Developer", Description: "Next.js Developer", CompanyID: "10000001", Deadline: time.Now().AddDate(0, 1, 0), Status: "open"},
		{JobID: "20000003", Title: "QA Engineer", Description: "Software Tester", CompanyID: "10000001", Deadline: time.Now().AddDate(0, 0, 15), Status: "closed"},
		{JobID: "20000004", Title: "DevOps Engineer", Description: "CI/CD and Cloud", CompanyID: "10000001", Deadline: time.Now().AddDate(0, 2, 0), Status: "open"},
		{JobID: "20000005", Title: "Mobile Developer", Description: "Flutter Developer", CompanyID: "10000001", Deadline: time.Now().AddDate(0, 1, 10), Status: "open"},
		{JobID: "20000006", Title: "Data Analyst", Description: "SQL and BI Tools", CompanyID: "10000002", Deadline: time.Now().AddDate(0, 0, 20), Status: "open"},
		{JobID: "20000007", Title: "Data Scientist", Description: "Machine Learning", CompanyID: "10000002", Deadline: time.Now().AddDate(0, 2, 0), Status: "open"},
		{JobID: "20000008", Title: "System Admin", Description: "Linux Server Management", CompanyID: "10000002", Deadline: time.Now().AddDate(0, 0, 10), Status: "closed"},
		{JobID: "20000009", Title: "UI/UX Designer", Description: "Figma, Wireframe", CompanyID: "10000002", Deadline: time.Now().AddDate(0, 1, 5), Status: "open"},
		{JobID: "20000010", Title: "Project Manager", Description: "Agile, Scrum", CompanyID: "10000002", Deadline: time.Now().AddDate(0, 3, 0), Status: "open"},
	}
	db.Create(&jobs)

	log.Println("✅ Seed data inserted successfully")
}
