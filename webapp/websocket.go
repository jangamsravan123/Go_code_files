package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"

	//"encoding/json"
	"io/ioutil"
	"os"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

type Interfaces struct {
	Interfaces []Interface `json:"Interfaces"`
}

type Interface struct {
	InterfaceName       string `json:"InterfaceName"`
	PortType            string `json:"PortType"`
	AssociatedPort      string `json:"AssociatedPort"`
	Vlan                string `json:"Vlan"`
	NetworkMode         string `json:"NetworkMode`
	Type                string `json:"Type`
	IgnoreAutoDNS       bool   `json:"IgnoreAutoDNS"`
	DNS4                string `json:"DNS4"`
	DNS6                string `json:"DNS6"`
	APN                 string `json:"APN"`
	MTU                 string `json:"MTU"`
	AutoNeg             string `json:"AutoNeg"`
	Speed               string `json:"Speed"`
	Duplex              string `json:"Duplex"`
	CS                  bool   `json:"CS"`
	PreferredController bool   `json:"PrefferedController"`
	GateWay             bool   `json:"GateWay"`
	EndPoint4           string `json:"EndPoint4"`
	EndPoint6           string `json:"EndPoint6"`
	MPLS                bool   `json:"MPLS"`
	LoopbackIP          string `json:"LoopbackIP"`
	LoopbackMask        string `json:"LoopbackMask"`
	/*IP4 string `json:"IP4"`
	  PrefixLength4 string `json:"PrefixLength4"`
	  GateWay4 string `json:"GateWay4"`
	  StaticNatIP4 string `json:"StaticNatIP4"`
	  IP6 string `json:"IP6"`
	  PrefixLength6 string `json:"PrefixLength6"`
	  GateWay6 string `json:"GateWay6"`
	  StaticNatIP6 string `json:"StaticNatIP6"`*/
	IPv4     IPv4   `json:"IPv4"`
	IPv6     IPv6   `json:"IPv6"`
	UserName string `json:"UserName"`
	Password string `json:"Password"`
}

type IPv4 struct {
	Type         string `json:"Type"`
	IP           string `json:"IP"`
	PrefixLength string `json:"PrefixLength"`
	GateWay      string `json:"GateWay"`
	StaticNatIP  string `json:"StaticNatIP"`
}

type IPv6 struct {
	Type         string `json:"Type"`
	IP           string `json:"IP"`
	PrefixLength string `json:"PrefixLength"`
	GateWay      string `json:"GateWay"`
	StaticNatIP  string `json:"StaticNatIP"`
}

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Home Page")
}

func wsViewEndpoint(w http.ResponseWriter, r *http.Request) {
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }

	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println(err)
	}
	jsonFile, err := os.Open("data.json")
	if err != nil {
		fmt.Println(err)
	}
	defer jsonFile.Close()

	mdata, _ := ioutil.ReadAll(jsonFile)
	fmt.Println(string(mdata))

	if err := ws.WriteMessage(1, mdata); err != nil {
		fmt.Println(err)
		return
	}
}

func wsSaveEndpoint(w http.ResponseWriter, r *http.Request) {
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }

	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println(err)
	}
	message := "successfully saved"
	messageType, p, err := ws.ReadMessage()
	fmt.Println(p, messageType)
	if err != nil {
		message = "Erron while saving the record"
		log.Println(err)
		_ = ws.WriteMessage(1, []byte(message))
		return
	}
	log.Println("Client Connected")
	fmt.Println(string(p))

	/* var device Interfaces
	   var inter Interface
	   json.Unmarshal(p, &inter)
	   device.Interfaces = append(device.Interfaces, inter)
	   mdata, _ := json.Marshal(device)*/
	// _ = ioutil.WriteFile("data.json",mdata, 0644)

	if err := ioutil.WriteFile("data.json", p, 0644); err != nil {
		message = "Erron while saving the record"
		log.Println(err)
	}

	if err := ws.WriteMessage(1, []byte(message)); err != nil {
		fmt.Println(err)
		return
	}
}

func setupRoutes() {
	http.HandleFunc("/", homePage)
	http.HandleFunc("/ws/view", wsViewEndpoint)
	http.HandleFunc("/ws/save", wsSaveEndpoint)
}

func main() {
	fmt.Println("Hello World")
	setupRoutes()
	log.Fatal(http.ListenAndServe(":8080", nil))
}
