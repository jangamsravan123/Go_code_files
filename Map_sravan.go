package main

import (
	"fmt"
	"math/rand"
	"strconv"
	"time"
)

func main() {
	var x = 0
	var val int
	var s string
	var Mymap map[string]string = make(map[string]string)
	for x = 0; x < 10000000; x++ {
		//val = rand.Intn(100)
		val = x
		s = strconv.Itoa(val)
		Mymap[s] = "this is my new map value"
		//fmt.Println(x, val, s)
	}
	
         fmt.Println("created and Searching")
	dt1 := time.Now()
	for x = 0; x < 1000; x++ {
		val = rand.Intn(1000)
		s = strconv.Itoa(val)
		_,_ = Mymap[s]

		//fmt.Println(x, num, p)
	}

	fmt.Println()
	dt2 := time.Since(dt1)
	//fmt.Println(dt1)
	fmt.Println("Searching time for 1000 records",dt2)
	fmt.Println("searching time for 1 record", dt2/1000.00)

}
