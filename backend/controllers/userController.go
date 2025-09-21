package controllers

import (
	"net/http"

	"github.com/ainisthaa/model"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type LoginInput struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func Login(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var input LoginInput
		if err := c.ShouldBindJSON(&input); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
			return
		}

		// หา user จาก email
		var user model.User
		if err := db.First(&user, "email = ?", input.Email).Error; err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
			return
		}

		// ตรวจ password
		if user.Password != input.Password {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid password"})
			return
		}

		// ถ้า login สำเร็จ → return role
		c.JSON(http.StatusOK, gin.H{
			"message": "Login success",
			"role":    user.Role,
			"user": gin.H{
				"user_id": user.UserID,
				"email":   user.Email,
			},
		})
	}
}
