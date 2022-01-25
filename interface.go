package main

import "fmt"

type book struct {
	name  string
	value int
}
type ball struct {
	name  string
	value int
}

func (s book) show() {
	fmt.Println(s)
}
func (s ball) show() {
	fmt.Println(s)
}

type list interface {
	show()
}

func main() {

	book1 := book{
		name:  "c++",
		value: 200,
	}
	ball1 := ball{
		name:  "tennis",
		value: 400,
	}

	var store [2]list
	store[0] = ball1
	store[0].show()
	store[1] = book1
	store[1].show()
}
