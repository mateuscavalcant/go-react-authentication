package handlers

import (
	"authentication-app/backend/pkg/database"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)


func Home(c *gin.Context) {
	// Obter o ID do usuário da sessão JWT
	userID, exists := c.Get("id")
	if !exists {
		// Lidar com o caso em que o ID do usuário não está disponível
		log.Println("ID do usuário não encontrado na sessão")
		c.JSON(http.StatusUnauthorized, gin.H{"error": "ID do usuário não encontrado na sessão"})
		return
	}

	log.Println("ID do usuário:", userID)

	// Conectar ao banco de dados
	db := database.GetDB()

	// Consulta para obter o nome do usuário com base no ID
	var name string
	err := db.QueryRow("SELECT name FROM user WHERE id=?", userID).Scan(&name)
	if err != nil {
		log.Println("Error fetching user name:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch user name"})
		return
	}

	// Construir a mensagem de boas-vindas personalizada
	message := "Welcome, " + name + ", to the home route"

	// Enviar a mensagem de boas-vindas para o cliente
	c.JSON(http.StatusOK, gin.H{"message": message})
}