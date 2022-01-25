package main

import "fmt"

func main() {
	fmt.Println("Enter the value to get the fibonacci num")
	var value int
	fmt.Scan(&value)
	fmt.Printf("The %dth fibonacci no is : %d \n ", value, Fibonacci(value))
}

func Fibonacci(value int) int{
	if value < 2 {
		return value
	}
	return Fibonacci(value - 1) + Fibonacci(value - 2)
}

