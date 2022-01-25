package main

import "fmt"

func main() {
	fmt.Println("The Bigger num is", BiggerNum(1,2,3,4,5,6))
}

func BiggerNum(arg ...int) int{
	MaxNum := arg[0]
	for  _, val := range arg {
		if MaxNum < val {
			MaxNum = val
		}
	}
	return MaxNum
}

