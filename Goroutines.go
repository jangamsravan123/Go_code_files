package main

import (
	"fmt"
	"sync" )

    var wg = sync.WaitGroup{}


func display(s string){
        for i:=0; i<5;i++{

	   fmt.Println(s)
	  // wg.Done()
	   //time.Sleep(time.Millisecond*5)
        }

	wg.Done()

}
func Show(s string){
 
	fmt.Println(s)
 }

func main(){
     
	 wg.Add(1)
	 go display("sravan")

	// time.Sleep(time.Second)

	 Show("Ramesh is a good boy")
         
	 wg.Wait()


}
