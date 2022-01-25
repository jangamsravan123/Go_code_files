package main

import (
    "fmt"
    "log"
    "net/http"
	"github.com/gorilla/websocket"
	"encoding/json"
    "io/ioutil"
)

type Person struct {
	Text string `json:"Text"`
	Info string `json:"Info"`
}

var upgrader = websocket.Upgrader{
    ReadBufferSize:  1024,
    WriteBufferSize: 1024,
}

type Interface struct {
    InterfaceName string `json:"InterfaceName"`
    PortType string `json:"PortType"`
    AssociatedPort string `json:"AssociatedPort"`
    Vlan  string `json:"Vlan"`
    NetworkMode string `json:"NetworkMode`
    Type string `json:"Type`
    IgnoreAutoDNS string `json:"IgnoreAutoDNS"`
    DNS string `json:"DNS"`
    MTU string `json:"MTU"`
    AutoNeg string `json:"AutoNeg"`
    Speed string `json:"Speed"`
    Duplex string `json:"Duplex"`
    CS string `json:"CS"`
    PrefferedController string `json:"PrefferedController"`
    GateWay string `json:"GateWay"`
    EndPoint string `json:"EndPoint"`
}

func homePage(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Home Page")
}

func wsEndpoint(w http.ResponseWriter, r *http.Request) {
    upgrader.CheckOrigin = func(r *http.Request) bool { return true }

    // upgrade this connection to a WebSocket
    // connection
    ws, err := upgrader.Upgrade(w, r, nil)
    if err != nil {
        fmt.Println(err)
    }

    log.Println("Client Connected")
    /*err = ws.WriteMessage(1, []byte("Hi Janagam sravan"))
    if err != nil {
        fmt.Println(err)
    }
    // listen indefinitely for new messages coming
    // through on our WebSocket connection*/
    reader(ws)
}

func reader(conn *websocket.Conn) {
	interfacedata := Interface {
		InterfaceName : "wan0",
    	PortType : "Ethernet",
		AssociatedPort : "eth1",
    	Vlan : "172.168.1.105",
    	NetworkMode : "IPv4 Only",
    	Type : "DHCP",
    	IgnoreAutoDNS : "true",
    	DNS : "168.1.104.7",
    	MTU : "123445",
    	AutoNeg : "on",
    	Speed : "30s",
    	Duplex : "any value",
    	CS : "false",
    	PrefferedController : "true",
    	GateWay : "true",
    	EndPoint : "8.8.5.20",
	}
    for {
    // read in a message
        messageType, p, err := conn.ReadMessage()
        if err != nil {
            log.Println(err)
            return
        }
		fmt.Println(string(p))

    // print out that message for clarity
        //fmt.Println(string(p))
		//var jsonvalue Person
		//json.Unmarshal(p, &jsonvalue)
		//fmt.Println(jsonvalue.Text)
		//fmt.Println(jsonvalue.Info)
		 mdata, _ := json.Marshal(interfacedata)
		 //fmt.Println(string(mdata))
         _ = ioutil.WriteFile("data.json", mdata, 0644)
	    //renderTemplate(w, "view", interfaces[0])
	   


        if err := conn.WriteMessage(messageType, mdata); err != nil {
            fmt.Println(err)
            return
        }
    }
    
}

func dummyreader(conn *websocket.Conn) {
	interfacedata := Interface {
		InterfaceName : "Lan0",
    	PortType : "Dummy",
		AssociatedPort : "eth1",
    	Vlan : "189.168.1.105",
    	NetworkMode : "IPv6 Only",
    	Type : "DHCP",
    	IgnoreAutoDNS : "true",
    	DNS : "168.1.104.7",
    	MTU : "123445",
    	AutoNeg : "on",
    	Speed : "30s",
    	Duplex : "any value",
    	CS : "false",
    	PrefferedController : "true",
    	GateWay : "true",
    	EndPoint : "8.8.5.78",
	}
    
    // read in a message
        messageType, p, err := conn.ReadMessage()
        if err != nil {
            log.Println(err)
            return
        }
		fmt.Println(string(p))

    // print out that message for clarity
        //fmt.Println(string(p))
		//var jsonvalue Person
		//json.Unmarshal(p, &jsonvalue)
		//fmt.Println(jsonvalue.Text)
		//fmt.Println(jsonvalue.Info)
		 mdata, _ := json.Marshal(interfacedata)
		 fmt.Println(string(mdata))
         _ = ioutil.WriteFile("data.json", mdata, 0644)
        if err := conn.WriteMessage(messageType, mdata); err != nil {
            fmt.Println(err)
            return
        }

    
}

func viewEndpoint(w http.ResponseWriter, r *http.Request) {
    upgrader.CheckOrigin = func(r *http.Request) bool { return true }

    // upgrade this connection to a WebSocket
    // connection
    ws, err := upgrader.Upgrade(w, r, nil)
    if err != nil {
        fmt.Println(err)
    }

    log.Println("Client Connected")
    /*err = ws.WriteMessage(1, []byte("Hi Janagam sravan"))
    if err != nil {
        fmt.Println(err)
    }
    // listen indefinitely for new messages coming
    // through on our WebSocket connection*/
    dummyreader(ws)
}

func setupRoutes() {
    http.HandleFunc("/", homePage)
    http.HandleFunc("/ws", wsEndpoint)
    http.HandleFunc("/ws/view", viewEndpoint)
}

func main() {
    fmt.Println("Hello World")
    setupRoutes()
    log.Fatal(http.ListenAndServe(":8080", nil))
}