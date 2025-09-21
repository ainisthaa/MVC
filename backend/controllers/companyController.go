package controllers

import (
	"net/http"

	"github.com/ainisthaa/model"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetCompanies(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var companies []model.Company
		if err := db.Find(&companies).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, companies)
	}
}
