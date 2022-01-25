package main

import "fmt"

func main() {

	var value int
	fmt.Println("Enter value to check")
	fmt.Scan(&value)

	fmt.Println("check for even or odd")
	half, boolValue := EvenOrOdd(value)
	fmt.Printf("the value %f is even %v \n", value, boolValue)
	fmt.Println("The half value of %d is : %f", value, half)
}

func EvenOrOdd(value int) (int, bool){

	if value % 2 == 0 {
		return float64(value) / 2.0 , true
	}else {
		return float64(value) / 2.0 , false
	}
}




