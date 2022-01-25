package main

import (
	"fmt"
	"math"
)

type Rectangle  struct{
	length float64
	breadth float64
}

type Circle struct {
	radius float64
}

func (R *Rectangle) SetRectangle(l float64, b float64) {
	R.length = l
	R.breadth = b
}

func (C *Circle) SetCircle(r float64){
	C.radius = r
}

func Distance(x1, y1, x2, y2 float64) float64{
        l := x1-x2
	b := y1-y2

	return math.Sqrt(l*l + b*b)
}

func (C *Circle) Area() float64 {
	return math.Pi *( C.radius * C.radius)
}

func (R *Rectangle) Area() float64 {
	return R.length * R.breadth
}

func main() {
	circle := new(Circle)
	rectangle := new(Rectangle)
	var x1, x2, y1, y2, r1 float64
	fmt.Println("Enter the coordinates of rectangle")
	fmt.Scan(&x1)
	fmt.Scan(&y1)
	fmt.Scan(&x2)
	fmt.Scan(&y2)
	fmt.Println("Enter the Radius of Circle ")
	fmt.Scan(&r1)
	length := Distance(x1, y1, x1, y2)
	breadth := Distance(x1 , y1, x2, y1)
	rectangle.SetRectangle(length, breadth)
	circle.SetCircle(r1)
	fmt.Println("The area of Rectangle :", rectangle.Area())
	fmt.Println("The area of Circle :", circle.Area())
}
