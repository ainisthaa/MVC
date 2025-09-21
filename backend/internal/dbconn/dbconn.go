package dbconn

import (
	"fmt"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func DBConnect(username string, password string, host string, dbport string, dbname string) *gorm.DB {
	dns := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Bangkok", host, username, password, dbname, dbport)
	db, err := gorm.Open(postgres.Open(dns), &gorm.Config{})
	if err != nil {
		panic(("failed to connect database"))
	}

	return db
}
