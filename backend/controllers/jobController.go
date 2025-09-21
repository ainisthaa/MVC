package controllers

import (
	"net/http"

	"github.com/ainisthaa/model"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetOpenJobs(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var jobs []model.Job
		if err := db.Where("status = ?", "open").
			Order("title ASC, company_id ASC, deadline ASC").
			Find(&jobs).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, jobs)
	}
}

func GetJobByID(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")
		var job model.Job
		if err := db.First(&job, "job_id = ?", id).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Job not found"})
			return
		}
		c.JSON(http.StatusOK, job)
	}
}
