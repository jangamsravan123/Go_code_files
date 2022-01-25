package main

import (
	"log"
	"log/syslog"

	//	"log/syslog"
	"fmt"
	"os"
)

func main() {
	//log.SetPrefix("Log : ")
	//log.SetFlags(log.Ldate | log.Lmicroseconds | log.Llongfile)
	fmt.Println("this is with out log")
	log.Println("Printing Message")
	fmt.Println()
	//	log.Fatalln("Fatal Message")
	//	log.Panicln("Panic Message")
	//Log_File := "./myfile"
	//logFile, err := os.OpenFile(Log_File, os.O_APPEND|os.O_RDWR|os.O_CREATE, 0644)
	logWriter, err := syslog.New(syslog.LOG_SYSLOG, "my Awesome app")
	if err != nil {
		log.Fatalln("unable to set lofgile", err)
	}
	log.SetOutput(logWriter)
	//log.SetOutput(logFile)
	//log.SetOutput(os.Stderr)

	log.Println("log to sysylog")
	log.Println("log to sys logto")

	log.SetOutput(os.Stderr)

	log.Println("log to console")

}
