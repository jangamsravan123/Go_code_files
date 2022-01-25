package main

import (
	"fmt"
	"net"
	"os/exec"
	"os"
	"bufio"
	"encoding/binary"
	"strconv"
	"strings"
	"log"
)

const (
	file  = "route.txt"
	line  = 1    // line containing the gateway addr
	sep   = "\t" // field separator
	field = 2    // field containing hex gateway address 
)

func main() {
	cmd := exec.Command("/bin/sh", "/home/sravan/Downloads/Go_Lang/create_route.sh")
	_, err := cmd.CombinedOutput()
	if err != nil {
			fmt.Printf("error %s",err)
	}
	interfaces,err := net.Interfaces()
	count := len(interfaces)
	fmt.Println("Total no of Interfaces:" ,count)
	if err != nil {
		fmt.Println("No interfaces Found")
		return
	}

	for i,val := range interfaces {
		fmt.Println("Interface #",i)
		address,err := val.Addrs()
		if err != nil {
			fmt.Println("No address")
			return
		}
		fmt.Println("Name: ", val.Name)
		fmt.Println("MTU: ", val.MTU)
		fmt.Println("HardwareAddress: ", val.HardwareAddr)
		fmt.Println("Flags: ", val.Flags)
		fmt.Println("Index: ", val.Index)
		interface_name := val.Name
		default_gateway := get_gateway(interface_name)
		fmt.Println("DefaultGateway: ",default_gateway)
		for _,add := range address {
			fmt.Println("Address: ",add)
		}
		fmt.Println("")

	}

}

func get_gateway(name string) string{

	file, err := os.Open(file)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()
	scanner := bufio.NewScanner(file)
	for i := 0; i < line; i++ {
			scanner.Scan()

	}
	var ip string
	for scanner.Scan() {
		tokens := strings.Split(scanner.Text(), sep)
		if tokens[0] != name {
			continue
		}
		gatewayHex := "0x" + tokens[field]

		// cast hex address to uint32
		d, _ := strconv.ParseInt(gatewayHex, 0, 64)
		d32 := uint32(d)

		// make net.IP address from uint32
		ipd32 := make(net.IP, 4)
		binary.LittleEndian.PutUint32(ipd32, d32)

		// format net.IP to dotted ipV4 string
		ip = net.IP(ipd32).String()
		break
	}
	return ip
}

