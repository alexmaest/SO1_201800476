package main

import (
	"database/sql"
	"fmt"
	"strings"
	"log"

	"github.com/go-redis/redis"
	_ "github.com/go-sql-driver/mysql"
)

func main() {
	// Conexión con Redis
	client := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})

	// Conexión con MySQL
	db, err := sql.Open("mysql", "root:pass123@tcp(172.17.0.3:3306)/backendTable")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	
	// Subscripción al canal "boletas"
	pubsub := client.Subscribe("boletas")

	for {
		msg, err := pubsub.ReceiveMessage()
		if err != nil {
			fmt.Println(err)
			return
		}

		// Separar el mensaje en sus componentes
		values := strings.Split(msg.Payload, ":")
		if len(values) != 5 {
			fmt.Println("input does not match format")
			continue
		}

		// Insertar los componentes en la tabla correspondiente en MySQL
		_, err = db.Exec("INSERT INTO boletas (sede, municipio, departamento, papeleta, partido) VALUES (?, ?, ?, ?, ?)", values[0], values[1], values[2], values[3], values[4])
		if err != nil {
			fmt.Println("error aqui")
			fmt.Println(err)
			continue
		}

		fmt.Println("Registro insertado:", values)
	}
}