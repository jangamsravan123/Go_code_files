package main


import (
	"bufio"
	"fmt"
	"os"
	"strings"
	"errors"
	"sort"
)


func IsValidArgs(Args []string) (bool, error) {
	var err error
	if len(Args) > 5 {
		err = errors.New("More no of arguments than expected")
		return false, err
	}
	if len(Args) < 2 {
		err = errors.New("Less no of arguments than expected")
		return false, err
	}
	return true, err
}


func Help() {
	fmt.Println()
	fmt.Println("-------- USE --------")
	fmt.Println("mywc -l filename        // for no of Lines")
	fmt.Println("mywc -w filename        // for no of Words")
	fmt.Println("mywc -c filename        // for no of Characters")
	fmt.Println("mywc -l -w filename // no of Lines and Words")
	fmt.Println("--Use any such combination")
}


func Commands(Args []string) (string, []string, error) {
	CommandList := make([]string, 0, 3)
	commands := make(map[string]bool)
	commands["-l"] = true
	commands["-w"] = true
	commands["-c"] = true
	var FileName string = ""
	var err error
	for i := 1; i < len(Args); i++ {
		cmd := Args[i]
		_, ok := commands[cmd]
		if !ok {
			if strings.Contains(cmd, ".") && i == len(Args) - 1 {
				FileName = cmd
			} else {
				err = errors.New("Invalid Command")
			}
		} else {
			CommandList = append(CommandList, cmd)
		}
	}
	sort.Strings(CommandList)
	return FileName, CommandList, err
}


func GetCount(FileName string) (int, int, int, error) {
	var LineCount, WordCount, CharCount int
	var err error
	file, err := os.Open(FileName)
	defer file.Close()

	if err != nil {
		err = errors.New("File not Found")
	} else {
		scanner := bufio.NewScanner(file)
		for scanner.Scan() {
			text := scanner.Text()
			LineCount++
			WordCount = WordCount + strings.Count(text, " ")
			CharCount = CharCount + len(text)
		}
	}
	CharCount = CharCount - WordCount
	WordCount = WordCount + LineCount
	return CharCount, WordCount, LineCount, err
}


func main() {
	if _, ok := IsValidArgs(os.Args); ok != nil {
		fmt.Println(ok)
		Help()
		os.Exit(0)
	}

	CommandList := make([]string, 0, 3)
	var FileName string
	var err error
	FileName, CommandList, err = Commands(os.Args)
	if err != nil {
		fmt.Println(err)
		Help()
		os.Exit(0)
	}

	var LineCount, WordCount, CharCount int
	CharCount, WordCount, LineCount, err = GetCount(FileName)
	if err != nil {
		fmt.Println(err)
		fmt.Println("Enter the Data :")
		scanner := bufio.NewScanner(os.Stdin)
		scanner.Scan()
		text := scanner.Text()
		LineCount = 1
		WordCount = strings.Count(text, " ")
		CharCount = len(text)
		CharCount = CharCount - WordCount
		WordCount = WordCount + LineCount
	}

	for _, cmd := range CommandList {
		switch cmd {
		case "-l" :
			fmt.Println("The number of Lines : ", LineCount)
		case "-w" :
			fmt.Println("The number of Words : ", WordCount)
		case "-c" :
			fmt.Println("The number of Characters : ", CharCount)
		}
	}
}
