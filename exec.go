package main

import (
	"bytes"
	"fmt"
	"log"
	"os/exec"
)

func main() {

	cmd := exec.Command("route")
	var out bytes.Buffer
	cmd.Stdout = &out

	err := cmd.Run()

	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(out.String())
	fmt.Println()
	fmt.Println()
	fmt.Println()
	fmt.Println()
	cmd1, _ := exec.Command("ls", "-a", "-l").Output()
	fmt.Println(string(cmd1))
}
