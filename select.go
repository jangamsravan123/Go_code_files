package main

import (
	"fmt"
	"time"
)


func Sender1(c chan<-string) {
	for i := 0; i < 5; i++ {
		c <- "from1"
		time.Sleep(time.Millisecond * 2)
	}
}


func Sender2(c chan<-string) {
	for i := 0; i < 5; i++  {
		c <- "from 2"
		time.Sleep(time.Millisecond * 4)
	}
}

func main() {
	c1 := make(chan string)
	c2 := make(chan string)
	go Sender1(c1)
	go Sender2(c2)

	for {
		select {
		case msg :=  <-c1 :
			fmt.Println(msg)
		case msg := <-c2 :
			fmt.Println(msg)
		}
	}
}

