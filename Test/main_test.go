package main


import "testing"



func Foo() {
}


func TestAverage(t *testing.T) {
	var val float64
	val = Average([]int {1, 2})
	if val !=  1.5 {
		t.Error("Expected 1.5, got,", val)
	}
}


func TestAdd(t *testing.T) {
	var v int
	v = Add([2]int{5, 6})
	if v != 11 {
		t.Error("Expected 11, Got ,", v)
	}
}


type averages struct {
	input []int
	output float64
}


func TestTableAverage(t *testing.T) {
	var num = []averages {
		{[]int{5, 6}, 5.5},
		{[]int{7, 9}, 8.0},
		{[]int{9, 17}, 13.0},
	}
	for _, val := range num {
		if Average(val.input) != val.output {
			t.Error("Expected , got not Equal")
		}
	}
}


func TestNew(t *testing.T) {
	var x float64
	x = Average([]int{10, 20})
	if x != 14 {
		t.Error("Expected 15, got ", x)
	}
}


func TestShow(t *testing.T) {
	var s []string = []string{"sravan", "jaykumar", "Ramesh"}
	for _, val := range s {
		msg := Show(val)
		if msg != val {
			t.Error("Expected {} Givene {}", val, msg)
		}
	}

}


func TestNegativeAddNew(t *testing.T) {
	var val int
	val = Add([2]int{8, 10})
	if val == 16 {
		t.Error("Expected 16, Giving ", val)
	}
}
