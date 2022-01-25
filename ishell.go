package main

import (
	"fmt"
	"strings"

	"gopkg.in/abiosoft/ishell.v2"
)

func main() {
	// create new shell.
	// by default, new shell includes 'exit', 'help' and 'clear' commands.
	shell := ishell.New()

	// display welcome info.
	shell.Println("Sample Interactive Shell")

	// register a function for "greet" command.
	shell.AddCmd(&ishell.Cmd{
		Name: "greet",
		Help: "greet user",
		Func: func(c *ishell.Context) {
			c.Println("Hello", strings.Join(c.Args, " "))
		},
	})

	shell.AddCmd(&ishell.Cmd{
		Name: "greet",
		Help: "greet user",
		Func: func(c *ishell.Context) {
			c.Println("Hello", strings.Join(c.Args, " "))
		},
	})
	shell.AddCmd(&ishell.Cmd{
		Name: "login",
		Help: "simulate a login",
		Func: func(c *ishell.Context) {
			// disable the '>>>' for cleaner same line input.
			c.ShowPrompt(false)
			defer c.ShowPrompt(true) // yes, revert after login.

			// get username
			c.Print("Username: ")
			username := c.ReadLine()

			// get password.
			c.Print("Password: ")
			password := c.ReadPassword()

			// do something with username and password
			fmt.Println(username, password)
			c.Println("Authentication Successful.")
		},
	})

	// run shell
	shell.Run()
}
