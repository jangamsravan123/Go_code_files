package main

import (
	"bufio"
	"encoding/binary"
	"fmt"
	"log"
	"net"
	"os"
	"strconv"
	"strings"
)

const (
	file  = "file.txt"
	line  = 1    // line containing the gateway addr. (first line: 0)
	sep   = "\t" // field separator
	field = 2    // field containing hex gateway address (first field: 0)
)

func main() {

	file, err := os.Open(file)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	for i := 0; i < line; i++ {
		scanner.Scan()
		//fmt.Println(val)

	}

	for scanner.Scan() {

		// jump to line containing the agteway address

		// get field containing gateway address
		//fmt.Println(scanner.Text())
		tokens := strings.Split(scanner.Text(), sep)
		//fmt.Println(tokens)
		gatewayHex := "0x" + tokens[field]
		//fmt.Println(gatewayHex)

		// cast hex address to uint32
		d, _ := strconv.ParseInt(gatewayHex, 0, 64)
		//fmt.Println(d)
		d32 := uint32(d)
		//fmt.Println(d32)

		// make net.IP address from uint32
		ipd32 := make(net.IP, 4)
		//fmt.Println(ipd32)
		binary.LittleEndian.PutUint32(ipd32, d32)
		fmt.Printf("%T --> %[1]v\n", ipd32)

		// format net.IP to dotted ipV4 string
		ip := net.IP(ipd32).String()
		fmt.Printf("%T --> %[1]v\n", ip)
		fmt.Println()

		// exit scanner
		//break
	}
}
