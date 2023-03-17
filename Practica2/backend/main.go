package main

import (
    "github.com/mackerelio/go-osstat/cpu"
	_ "github.com/go-sql-driver/mysql"
    "encoding/json"
    "database/sql"
    "io/ioutil"
    "os/exec"
    "strconv"
	"strings"
    "time"
	"fmt"
	"os"
)

var Modulocpu = "/proc/cpu_201800476"
var Moduloram = "/proc/ram_201800476"

var conn = MySQLConnection()

func MySQLConnection() *sql.DB {
    usuario := "root"
    pass := "pass123"
    host := "tcp(34.125.230.126:3306)"
    db := "backendTable"
    conn, err := sql.Open("mysql", fmt.Sprintf("%s:%s@%s/%s", usuario, pass, host, db))
    if err != nil {
        fmt.Println("HAY ERROR: \n", err)
    } else {
        fmt.Println("se ha conectado a mysql!")
    }
    return conn
}

type Proceso struct {
    Pid         int    `json:"Pid"`
    Nombre      string `json:"Nombre"`
    Estado      int    `json:"Estado"`
    User        string `json:"User"`
    Mem         int    `json:"Mem"`
    Subprocesos []struct {
        Pid    int    `json:"Pid"`
        Nombre string `json:"Nombre"`
        Ppid   int    `json:"Ppid"`
    } `json:"Subprocesos"`
}

type ProcesosI struct {
    Procesos []Proceso `json:"Procesos"`
    Estados  struct {
        Ejecucion  int `json:"Ejecucion"`
        Suspendido int `json:"Suspendido"`
        Detenido   int `json:"Detenido"`
        Zombie     int `json:"Zombie"`
        Total      int `json:"Total"`
    } `json:"Estados"`
}

type Ram struct {
    Porcentaje string `json:"Porcentaje"`
}

type Cpuso struct {
    Porcentaje string `json:"Porcentaje"`
}

var R Ram
var B Cpuso
var P ProcesosI

func getModuleCPU() {
    data, err := ioutil.ReadFile(Modulocpu)
    if err != nil {
        fmt.Println(err)
    }
    err = json.Unmarshal(data, &P)
    if err != nil {
        fmt.Println(err)
    }
}

func getModuleRAM() {
    data, err := ioutil.ReadFile(Moduloram)
    if err != nil {
        fmt.Println(err)
    }
    err = json.Unmarshal(data, &R)
    if err != nil {
        fmt.Println(err)
    }
}

func createProcesses() {
    getModuleCPU()
    borrar := "DELETE FROM Procesos"
    _, err := conn.Exec(borrar)
    if err != nil {
        fmt.Println("Error al borrar")
    }

    for i := range P.Procesos {
        // Ejecutar comando para obtener el UID del usuario
        cmd := exec.Command("getent", "passwd", P.Procesos[i].User)
        out, err := cmd.Output()
        if err != nil {
            //fmt.Println("Error al ejecutar comando:", err)
            continue
        }
        // Extraer el UID del resultado y asignarlo al proceso
        uid := strings.Split(string(out), ":")[0]
        P.Procesos[i].User = strings.TrimSpace(string(uid))
    }

    b, err := json.Marshal(P)
    if err != nil {
        fmt.Println("Error al convertir a json")
        return
    }
    query := "INSERT INTO Procesos VALUES('" + string(b) + "');"
    _, err = conn.Exec(query)
    if err != nil {
        fmt.Println("Error al insertar")
        fmt.Println(err)
        return
    }
}

func createRam() {
	getModuleRAM()
	borrar := "DELETE FROM RAM"
	_, err := conn.Exec(borrar)
	if err != nil {
		fmt.Println("Error al borrar")
	}
	
	query := "INSERT INTO RAM VALUES('" + string(R.Porcentaje) + "');"
	_, err1 := conn.Exec(query)
	if err1 != nil {
		fmt.Println("Error al insertar")
	}
}

func cpuUsage() {
	before, err := cpu.Get()
	if err != nil {
		fmt.Fprintf(os.Stderr, "%s\n", err)
		return
	}
	time.Sleep(time.Duration(100) * time.Millisecond)
	after, err := cpu.Get()
	if err != nil {
		fmt.Fprintf(os.Stderr, "%s\n", err)
		return
	}
	total := float64(after.Total - before.Total)
	uso := 100 - (float64(after.Idle-before.Idle) / total * 100)
	a := strconv.FormatFloat(uso, 'f', 2, 64)
	B.Porcentaje = a
}

func createUseCpu() {
	cpuUsage()
	borrar := "DELETE FROM Cpu"
	_, err := conn.Exec(borrar)
	if err != nil {
		fmt.Println("Error al borrar")
	}
	
	query := "INSERT INTO Cpu VALUES('" + string(B.Porcentaje) + "');"
	_, err1 := conn.Exec(query)
	if err1 != nil {
		fmt.Println("Error al insertar")
	}
}

func main() {
	fmt.Println("************************************************************")
	fmt.Println("*                 SO1 Practica 2 - 201800476               *")
	fmt.Println("************************************************************")
	for {
		createProcesses()
		createRam()
		createUseCpu()
		fmt.Println("Información: Los datos han sido actualizados")
		time.Sleep(time.Duration(1000) * time.Millisecond)
	}
}