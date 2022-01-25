package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func wsEndpoint(w http.ResponseWriter, r *http.Request) {
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }

	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println(err)
	}

	log.Println("Client Connected")

	reader(ws)
}

func reader(conn *websocket.Conn) {
	file, err := os.Open("./device_info.json")
	if err != nil {
		os.Exit(0)
	}
	defer file.Close()
	info, err := ioutil.ReadAll(file)
	var device Devices
	json.Unmarshal(info, &device)
	messageType, p, err := conn.ReadMessage()
	if err != nil {
		log.Println(err)
		return
	}
	fmt.Println(string(p))

	mdata, _ := json.Marshal(device)
	fmt.Println(string(mdata))
	if err := conn.WriteMessage(messageType, mdata); err != nil {
		fmt.Println(err)
		return
	}
}

type Devices struct {
	Devices []Device `json:"devices"`
}

type Device struct {
	HostName string `json:"HostName"`
	ModelNo  string `json:"ModelNo"`
	SerialNo string `json:"SerialNo"`
	UUID     string `json:"UUID"`
	Cs_Url   string `json:"Cs_Url"`
}

func viewDevice(w http.ResponseWriter, r *http.Request) {
	//func viewHandler() Devices {
	file, err := os.Open("./device_info.json")
	if err != nil {
		os.Exit(0)
	}
	defer file.Close()
	info, err := ioutil.ReadAll(file)
	var device Devices
	json.Unmarshal(info, &device)
	//return device
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(device)
}

// func saveHandler(w http.ResponseWriter, r *http.Request) {
// 	var newDevice Device
// 	newDevice.HostName = r.FormValue("HostName")
// 	newDevice.ModelNo = r.FormValue("ModelNo")
// 	newDevice.SerialNo = r.FormValue("SerialNo")
// 	newDevice.UUID = r.FormValue("UUID")
// 	newDevice.Cs_Url = r.FormValue("Cs_Url")

// 	file, err := os.Open("./device_info.json")
// 	if err != nil {
// 		os.Exit(0)
// 	}
// 	info, err := ioutil.ReadAll(file)
// 	var saveDevice Devices
// 	json.Unmarshal(info, &saveDevice)
// 	file.Close()

// 	//var saveDevice Devices
// 	saveDevice.Devices = append(saveDevice.Devices, newDevice)

// 	jsonInfo, err := json.Marshal(saveDevice)
// 	if err != nil {
// 		os.Exit(0)
// 	}
// 	_ = ioutil.WriteFile("device_info.json", jsonInfo, 0644)

// 	w.Header().Set("Content-Type", "application/json")
// 	json.NewEncoder(w).Encode(newDevice)
// }

// func updateHandler(w http.ResponseWriter, r *http.Request) {

// 	var UD Device
// 	UD.HostName = r.FormValue("HostName")
// 	UD.ModelNo = r.FormValue("ModelNo")
// 	UD.SerialNo = r.FormValue("SerialNo")
// 	UD.UUID = r.FormValue("UUID")
// 	UD.Cs_Url = r.FormValue("Cs_Url")

// 	file, err := os.Open("./device_info.json")
// 	if err != nil {
// 		os.Exit(0)
// 	}
// 	info, err := ioutil.ReadAll(file)
// 	var saveDevice Devices
// 	json.Unmarshal(info, &saveDevice)
// 	file.Close()
// 	var val = 0
// 	for _, obj := range saveDevice.Devices {
// 		if obj.HostName == r.FormValue("Id") {
// 			if UD.ModelNo == "" {
// 				UD.ModelNo = obj.ModelNo
// 			}
// 			if UD.SerialNo == "" {
// 				UD.SerialNo = obj.SerialNo
// 			}
// 			if UD.HostName == "" {
// 				UD.HostName = obj.HostName
// 			}
// 			if UD.UUID == "" {
// 				UD.UUID = obj.UUID
// 			}
// 			if UD.Cs_Url == "" {
// 				UD.Cs_Url = obj.Cs_Url
// 			}

// 			saveDevice.Devices[val] = UD
// 			break
// 		}
// 		val ++
// 	}

// 	jsonInfo, err := json.Marshal(saveDevice)
// 	if err != nil {
// 		os.Exit(0)
// 	}
// 	_ = ioutil.WriteFile("device_info.json", jsonInfo, 0644)

// 	w.Header().Set("Content-Type", "application/json")
// 	json.NewEncoder(w).Encode(UD)
// }

func setupRoutes() {
	http.HandleFunc("/view/device", viewDevice)
	http.HandleFunc("/ws", wsEndpoint)
}

func main() {

	//Cors Policy
	//router := mux.NewRouter()
	//headers := handlers.allowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
	//methods := handlers.allowedMethods([]string{"GET", "POST", "PUT", "DELETE"})
	//origins := handlers.allowedOrigins([]string{"*"})
	//router.HandleFunc("/view", viewHandler).Methods("GET")
	//http.ListenAndServe(":8080", handlers.CORS(headers, methods, origins)(router))
	//http.ListenAndServe(":8080", handlers.CORS()(router))

	//http.HandleFunc("/view", viewHandler)
	//http.HandleFunc("/save", saveHandler)
	//http.HandleFunc("/update", updateHandler)

	setupRoutes()
	log.Fatal(http.ListenAndServe(":8080", nil))
}
