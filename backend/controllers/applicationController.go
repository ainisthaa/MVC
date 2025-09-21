package controllers

import (
	"net/http"
	"time"

	"github.com/ainisthaa/model"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type ApplyInput struct {
	JobID       string `json:"job_id"`
	CandidateID string `json:"candidate_id"`
}

func ApplyJob(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var input ApplyInput
		if err := c.ShouldBindJSON(&input); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
			return
		}

		// เช็คว่า job ยังเปิดรับและไม่เกิน deadline
		var job model.Job
		if err := db.First(&job, "job_id = ?", input.JobID).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Job not found"})
			return
		}
		if job.Status != "open" || job.Deadline.Before(time.Now()) {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Job is closed"})
			return
		}

		// เช็คว่าผู้สมัครมีอยู่จริง
		var candidate model.Candidate
		if err := db.First(&candidate, "candidate_id = ?", input.CandidateID).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Candidate not found"})
			return
		}

		// สมัครงาน
		application := model.Application{
			JobID:       input.JobID,
			CandidateID: input.CandidateID,
		}
		if err := db.Create(&application).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusCreated, gin.H{"message": "Application submitted successfully"})
	}
}
