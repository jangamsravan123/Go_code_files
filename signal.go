package main

import (
	"fmt"
	"os"
	"os/signal"
	"syscall"
)

func show() {
	fmt.Println("dont terminate the system now")
}

func main() {
	sigs := make(chan os.Signal, 1)
	done := make(chan bool, 1)

	signal.Notify(sigs)

	go func() {
		for {
			sig := <-sigs
			show()
			switch sig {
			case syscall.SIGHUP:
				fmt.Println("Signal hang up triggered.")
				show()
			case syscall.SIGINT:
				fmt.Println("Signal interrupt triggered.")
			case syscall.SIGTERM:
				fmt.Println("Signal terminte triggered.")

			case syscall.SIGQUIT:
				fmt.Println("Signal quit triggered.")

			default:
				fmt.Println("Unknown signal.")

			}
		}
		done <- true
	}()

	fmt.Println("awaiting signal")
	<-done
	fmt.Println("exiting")
}
