package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"github.com/go-redis/redis"
)

type Voto struct {
	Sede         int    `json:"sede"`
	Municipio    string `json:"municipio"`
	Departamento string `json:"departamento"`
	Papeleta     string `json:"papeleta"`
	Partido      string `json:"partido"`
}

func main() {
	// Conexión con Redis
	client := redis.NewClient(&redis.Options{
		Addr:     "redis:6379",
		Password: "",
		DB:       0,
	})

	// Configuración del servidor HTTP
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == "POST" {
			// Decodificar el cuerpo de la solicitud en un objeto de estructura Go
			var v Voto
			err := json.NewDecoder(r.Body).Decode(&v)
			if err != nil {
				http.Error(w, err.Error(), http.StatusBadRequest)
				return
			}
			fmt.Println(v.Sede, v.Municipio, v.Departamento, v.Papeleta, v.Partido)
			// Obtener la clave y el valor a partir del objeto de estructura Go
			key := fmt.Sprintf("%d:%s:%s:%s:%s", v.Sede, v.Municipio, v.Departamento, v.Papeleta, v.Partido)
	
			err = client.Publish("boletas", key).Err()
			if err != nil {
				fmt.Println(err)
			}
		} else {
			http.Error(w, "Método no permitido", http.StatusMethodNotAllowed)
		}
	})

	// Iniciar el servidor HTTP en el puerto 3000
	fmt.Println("Iniciando servidor en http://localhost:5000/")
	http.ListenAndServe(":5000", nil)
}
