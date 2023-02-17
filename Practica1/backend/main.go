package main

import (
    _ "github.com/go-sql-driver/mysql"
	"github.com/gin-contrib/cors"
    "github.com/gin-gonic/gin"    
    "database/sql"
	"strconv"
	"time"
    "fmt"
	"os"
)

var res float64 = 0.0
var fail bool = false

func main() {
	router := gin.Default()
    router.Use(cors.Default())
	//db, err := sql.Open("mysql", "root:pass123@tcp(172.18.0.1:3306)/backendTable")

	router.GET("/Home", func(c *gin.Context) {
		clientIP := c.ClientIP()
		db, err := sql.Open("mysql", "root:pass123@tcp("+clientIP+":3306)/backendTable")
		if err != nil {
			fmt.Println("Error1")
			fmt.Println(err.Error())
			return
		}
		rows, err := db.Query("SELECT * FROM calcdb")
		if err != nil {
			fmt.Println("Error2")
			c.String(500, err.Error())
			return
		}
		defer rows.Close()
		
		f, err := os.OpenFile("../home/archivo.log", os.O_CREATE|os.O_WRONLY, 0644)
		if err != nil {
			fmt.Println("ErrorDoc00")
			fmt.Println(err)
			return
		}
		defer f.Close()

		dataList := []map[string]interface{}{}
		for rows.Next() {
			var num1 int
			var num2 int
			var signo string
			var res float64
			var inc string
			var fecha string
			err = rows.Scan(&num1, &num2, &signo, &res, &inc, &fecha)
			if err != nil {
				fmt.Println("Error3")
				// manejo del error
			}
			
			_, err = f.WriteString(fmt.Sprintf("%d", num1) + " " + fmt.Sprintf("%d", num2) + " \"" + signo + "\" " + fmt.Sprintf("%f", res) + " " + inc + " " + fecha + "\n")
			if err != nil {
				fmt.Println("ErrorDoc01")
				fmt.Println(err)
			}

			data := map[string]interface{}{
				"num1": num1,
				"num2": num2,
				"signo": signo,
				"res": res,
				"incorrecto": inc,
				"fecha": fecha,
			}
			dataList = append(dataList, data)
			// usa los valores de num1, num2 y signo aquí
			fmt.Println(num1, num2, signo, res, inc, fecha)
		}

		type Response struct {
			Message string `json:"message"`
			Resultado string `json:"resultado"`
		}
		result := strconv.FormatFloat(res, 'f', 2, 64)
		if fail{
			single := Response{Message: "Error", Resultado: "0"}
			c.JSON(200, single)
		}else{
			single := Response{Message: "Success", Resultado: result}
			c.JSON(200, single)
		}
	})
	router.POST("/Home", func(c *gin.Context) {
		clientIP := c.ClientIP()
		db, err := sql.Open("mysql", "root:pass123@tcp("+clientIP+":3306)/backendTable")
		if err != nil {
			fmt.Println("Error1")
			fmt.Println(err.Error())
			return
		}
		var data struct {
			Num1 string `json:"num1"`
			Num2 string `json:"num2"`
			Signo string `json:"sign"`
		}
		err = c.BindJSON(&data)
		if err != nil {
			fmt.Println("Error4")
			c.AbortWithStatus(400)
			return
		}
		num1, err := strconv.Atoi(data.Num1)
		num2, err := strconv.Atoi(data.Num2)
		res = 0.0
		fail = false
		if data.Signo == "+"{
			res = float64(num1 + num2)
		}else if data.Signo == "-"{
			res = float64(num1 - num2)
		}else if data.Signo == "*"{
			res = float64(num1 * num2)
		}else{
			if num2 == 0{
				fmt.Println("Error: No se puede dividir entre 0")
				fail = true
				res = 0.0
			}else{
				res = float64(num1 / num2)
			}
		}
		currentTime := time.Now()
		utc6, err := time.LoadLocation("America/Guatemala")
		fecha := currentTime.In(utc6).Format("2006-01-02 15:04:05")
		fmt.Println("=> ",data.Num1, data.Num2, data.Signo, res, fail, fecha)
		if fail{
			// Ejecuta la consulta INSERT
			var singleFail string = "true"
			_, err = db.Exec("INSERT INTO calcdb (numero1, numero2, signo, resultado, incorrecto, fecha) VALUES (?, ?, ?, ?, ?, ?)", data.Num1, data.Num2, data.Signo, res, singleFail, fecha)
			if err != nil {
				fmt.Println("Error5")
				c.String(500, err.Error())
				return
			}
		}else{
			// Ejecuta la consulta INSERT
			var singleFail string = "false"
			_, err = db.Exec("INSERT INTO calcdb (numero1, numero2, signo, resultado, incorrecto, fecha) VALUES (?, ?, ?, ?, ?, ?)", data.Num1, data.Num2, data.Signo, res, singleFail, fecha)
			if err != nil {
				fmt.Println("Error5")
				c.String(500, err.Error())
				return
			}
		}
		
		// Devuelve un mensaje de éxito
		fmt.Println("Los datos se han agregado correctamente.")
	})
	router.GET("/Logs", func(c *gin.Context) {
		clientIP := c.ClientIP()
		db, err := sql.Open("mysql", "root:pass123@tcp("+clientIP+":3306)/backendTable")
		if err != nil {
			fmt.Println("Error1")
			fmt.Println(err.Error())
			return
		}
		rows, err := db.Query("SELECT * FROM calcdb")
		if err != nil {
			fmt.Println("ErrorL2")
			c.String(500, err.Error())
			return
		}
		defer rows.Close()
		
		dataList := []map[string]interface{}{}
		for rows.Next() {
			var num1 int
			var num2 int
			var signo string
			var res float64
			var inc string
			var fecha string
			err = rows.Scan(&num1, &num2, &signo, &res, &inc, &fecha)
			if err != nil {
				fmt.Println("ErrorL3")
				// manejo del error
			}
			
			data := map[string]interface{}{
				"num1": num1,
				"num2": num2,
				"signo": signo,
				"res": res,
				"incorrecto": inc,
				"fecha": fecha,
			}
			dataList = append(dataList, data)
		}

		type Response struct {
			Message string `json:"message"`
			Resultado []map[string]interface{} `json:"resultado"`
		}
		single := Response{Message: "Success", Resultado: dataList}
		c.JSON(200, single)
	})
    router.Run(":5000")
}
