package routes

import (
	"authentication-app/backend/api/handlers"
	"authentication-app/backend/api/middlewares"

	"github.com/gin-gonic/gin"
)

func InitRoutes(r *gin.RouterGroup) {
	r.POST("/signup", handlers.CreateUserAccount)
	r.POST("/login", handlers.AccessUserAccount)
	r.POST("/protected", middlewares.AuthMiddleware(), handlers.Home)
}