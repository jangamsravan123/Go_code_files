package main

import (
	"fmt"
)

var arr [100]int

func main() {
	arr[0] = 1
	arr[1] = 1

	//c := make(chan string)
	//go count(c)
	//go show(c)
	//c <- "sravan"
	//c <- "vinay"
	c1 := make(chan int, 100)
	c2 := make(chan int, 100)

	go fibonacci(c1, c2)
	/*go fibonacci(c1, c2)
	go fibonacci(c1, c2)
	go fibonacci(c1, c2)
	go fibonacci(c1, c2)
	go fibonacci(c1, c2)
	go fibonacci(c1, c2)
	go fibonacci(c1, c2)
	go fibonacci(c1, c2)
	go fibonacci(c1, c2)
	go fibonacci(c1, c2)
	go fibonacci(c1, c2)
	go fibonacci(c1, c2)
	go fibonacci(c1, c2)
	go fibonacci(c1, c2)
	go fibonacci(c1, c2)
	go fibonacci(c1, c2)*/
	for i := 1; i <= 100; i++ {
		c1 <- i
	}
	close(c1)
	//fibonacci(c1, c2)
	for i := 0; i < 100; i++ {
		fmt.Println(<-c2)
	}
	//fmt.Scanln()

}

func fibo(val int) int {
	if val == 0 || val == 1 {
		return 1
	}
	return fibo(val-1) + fibo(val-2)
}

func fibonacci(s <-chan int, r chan<- int) {
	for val := range s {
		r <- fibo(val)
	}

}

func count(c chan string) {
	for {
		c <- "sravan"
	}
}

func show(c chan string) {
	for {
		msg := <-c
		fmt.Println(msg)
	}
}
