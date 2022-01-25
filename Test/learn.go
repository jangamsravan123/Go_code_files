package  main


import "fmt"


func main() {
	fmt.Println(Average([]int {1, 2}))
}


func Average(arr []int) float64 {
	return (float64(arr[0]) + float64(arr[1])) / float64(2)
}


func Add(arr [2]int) int {
	return arr[0] + arr[1]
}

