package controllers

import (
	"net/http"

	"github.com/ainisthaa/model"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetCandidates(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var candidates []model.Candidate
		if err := db.Order("first_name ASC").Find(&candidates).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, candidates)
	}
}

func GetCandidateDetail(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")

		var candidate model.Candidate
		if err := db.First(&candidate, "candidate_id = ?", id).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Candidate not found"})
			return
		}

		var applications []model.Application
		db.Where("candidate_id = ?", id).Find(&applications)

		c.JSON(http.StatusOK, gin.H{
			"candidate":    candidate,
			"applications": applications,
		})
	}
}
