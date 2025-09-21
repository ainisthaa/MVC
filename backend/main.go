package main

import (
	"fmt"

	"github.com/ainisthaa/conf"
	"github.com/ainisthaa/controllers"
	"github.com/ainisthaa/internal/dbconn"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {

	confic, err := conf.NewConfig()
	if err != nil {
		return
	}
	dbInstant := dbconn.DBConnect(confic.SERVICE_DB_USER, confic.SERVICE_DB_PASS, confic.SERVICE_DB_HOST, confic.SERVICE_DB_PORT, confic.SERVICE_DB_NAME)

	// dbInstant.Migrator().DropTable(&model.Food_Ingredient{})
	// dbInstant.AutoMigrate(&model.Job{})
	// migrate
	// dbInstant.Migrator().DropTable(
	// 	&model.Application{},
	// 	&model.Candidate{},
	// 	&model.Job{},
	// 	&model.Company{},
	// 	&model.User{},
	// )

	// dbInstant.AutoMigrate(
	// 	&model.User{},
	// 	&model.Company{},
	// 	&model.Job{},
	// 	&model.Candidate{},
	// 	&model.Application{},
	// )

	// seed
	// seed.SeedData(dbInstant)

	server := gin.Default()

	// server.Use(cors.Default()) // อนุญาตทุก origin (*)
	// server.Use()
	fmt.Print("Hello")

	server.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://172.20.10.2:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		AllowCredentials: true,
	}))
	//routers

	server.POST("/login", controllers.Login(dbInstant))
	server.GET("/jobs", controllers.GetOpenJobs(dbInstant))
	server.POST("/apply", controllers.ApplyJob(dbInstant))
	server.GET("/candidates", controllers.GetCandidates(dbInstant))
	server.GET("/candidates/:id", controllers.GetCandidateDetail(dbInstant))
	server.GET("/companies", controllers.GetCompanies(dbInstant))
	server.GET("/jobs/:id", controllers.GetJobByID(dbInstant))

	fmt.Println("Server started at :8890")
	server.Run(":8890")
}
