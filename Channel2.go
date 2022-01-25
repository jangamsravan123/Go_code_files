package main


import (
	"fmt"
	"time"
)


func Sender(c chan<-string) {
	c <-"message send"
	c <-"mesg2"
	c <-"mes3"
}


func Receiver(c <-chan string) {
    for {
		msg, ok := <-c
		if !ok {
			break
		}
		fmt.Println(msg)
	}

}


func main() {
	c := make(chan string)
	go Sender(c)
	go Receiver(c)
	time.Sleep(time.Millisecond * 10)
}
