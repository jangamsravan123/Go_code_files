package main

import (	
	"fmt"
	"sync")

	var wg = sync.WaitGroup{}

func send(ch chan<- int){

	ch <-30
	ch <- 50
	ch <-70
	close(ch)
        wg.Done()
}
func receive(ch <-chan int){
         
	for{
               i,ok:= <-ch
		if(ok){

			fmt.Println(i)
		}else{
			break}

	}

	wg.Done()

}


func main(){
	wg.Add(2)
    ch:= make(chan int,20)

     go send(ch)
     go receive(ch)
//     close(ch)
       fmt.Println("Starting")
       

       wg.Wait()
     
}

