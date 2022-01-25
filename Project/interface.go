package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"io/ioutil"
	"log"
	"net/http"
	"os"
)

type Interfaces struct {
	Interfaces []Interface `json:"data"`
}

type Interface struct {
	InterfaceName  string `json:"InterfaceName"`
	PortType       string `json:"PortType"`
	AssociatedPort string `json:"AssociatedPort"`
	Vlan           string `json:"Vlan"`
	NetworkMode    string `json:"NetworkMode"`
	NetworkType    string `json:"NetworkType"`
	MTU            string `json:"MTU"`
	Autoneg        string `json:"Autoneg"`
	Speed          string `json:"Speed"`
	Duplex         string `json:"Duplex"`
}

func viewHandler(w http.ResponseWriter, r *http.Request) {

	jsonFile, err := os.Open("data.json")
	if err != nil {
		fmt.Println(err)
	}

	defer jsonFile.Close()
	byteValue, _ := ioutil.ReadAll(jsonFile)

	var interfaces Interfaces

	json.Unmarshal(byteValue, &interfaces)
	t, _ := template.ParseFiles("index.html")
	t.Execute(w, interfaces.Interfaces[0])
	//renderTemplate(w, "view", interfaces[0])
}

func editHandler(w http.ResponseWriter, r *http.Request) {

	jsonFile, err := os.Open("data.json")
	if err != nil {
		fmt.Println(err)
	}

	defer jsonFile.Close()
	byteValue, _ := ioutil.ReadAll(jsonFile)

	var interfaces Interfaces

	json.Unmarshal(byteValue, &interfaces)
	t, _ := template.ParseFiles("edit.html")
	t.Execute(w, interfaces.Interfaces[0])
	//renderTemplate(w, "view", interfaces[0])
}

func saveHandler(w http.ResponseWriter, r *http.Request) {
	var interfaces Interfaces
	interfacedata := Interface{
		InterfaceName:  r.FormValue("interfacename"),
		PortType:       r.FormValue("porttype"),
		AssociatedPort: r.FormValue("associatedport"),
		Vlan:           r.FormValue("vlan"),
		NetworkMode:    r.FormValue("networkmode"),
		NetworkType:    r.FormValue("networktype"),
		MTU:            r.FormValue("mtu"),
		Autoneg:        r.FormValue("autogen"),
		Speed:          r.FormValue("speed"),
		Duplex:         r.FormValue("duplex"),
	} /*
		interfacedata := Interface{
			InterfaceName:  "wan0",
			PortType:       "Ethernet",
			AssociatedPort: "eth1",
			Vlan:           "189.0.12.4",
			NetworkMode:    "IPv4",
			NetworkType:    "DHCP",
			MTU:            "12345",
			Autoneg:        "on",
			Speed:          "30s",
			Duplex:         "no data",
		}*/
	interfaces.Interfaces = append(interfaces.Interfaces, interfacedata)
	file, _ := json.MarshalIndent(interfaces, "", " ")

	_ = ioutil.WriteFile("data.json", file, 0644)
	//renderTemplate(w, "view", interfaces[0])
	http.Redirect(w, r, "/view/", http.StatusFound)
}

func main() {

	http.HandleFunc("/view/", viewHandler)
	http.HandleFunc("/edit/", editHandler)
	http.HandleFunc("/save/", saveHandler)
	log.Fatal(http.ListenAndServe(":8080", nil))

}
