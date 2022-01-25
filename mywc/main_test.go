package main


import (
	"testing"
	"errors"
)


type Argument struct {
	Args []string
	output bool
	err error
}


func TestIsValidArgs(t *testing.T) {
	argument := []Argument {
		{[]string{"mywc", "-l", "-w", "-c", "data.txt"}, true, nil},
		{[]string{"mywc", "-l", "-w", "data.txt"}, true, nil},
		{[]string{"mywc", "-l", "data.txt"}, true, nil},
		{[]string{"mywc", "-l", "-w", "-x", "data.txt"}, true, nil},
	}

	for _, args := range argument {
		ok, err := IsValidArgs(args.Args)
		if ok != args.output {
			t.Error("Expected {}, but getting")
		}
		if !(err == args.err || err.Error() == args.err.Error()) {
			t.Error("Expected {}, but getting")
		}

	}
}



func TestIsValidArgsWhenMoreArgs(t *testing.T) {
	argument := []Argument {
		{[]string{"mywc", "-l", "-w", "-c", "data.txt", "-g"},
			false, errors.New("More no of arguments than expected")},
		{[]string{"mywc", "-l", "-w", "-x", "data.txt", "-c"},
			false, errors.New("More no of arguments than expected")},
	}

	for _, args := range argument {
		ok, err := IsValidArgs(args.Args)
		if ok != args.output {
			t.Error("Expected {}, but getting")
		}
		if !(err == args.err || err.Error() == args.err.Error()) {
			t.Error("Expected {}, but getting")
		}

	}
}


func TestIsValidArgsWhenLessArgs(t *testing.T) {
	argument := []Argument {
		{[]string{"-w"},
			false, errors.New("Less no of arguments than expected")},
		{[]string{"mywc"},
			false, errors.New("Less no of arguments than expected")},
	}

	for _, args := range argument {
		ok, err := IsValidArgs(args.Args)
		if ok != args.output {
			t.Error("Expected {}, but getting")
		}
		if !(err == args.err || err.Error() == args.err.Error()) {
			t.Error("Expected {}, but getting")
		}

	}
}


type FileArgs struct {
	Name string
	lc int
	wc int
	cc int
	err error
}


func TestGetCount(t *testing.T) {
	fileargs := []FileArgs {
		{"data.txt", 4, 14, 60, nil},
		{"file.txt", 1, 2, 11, nil},
	}
	for _, Args := range fileargs {
		cc, wc, lc, err := GetCount(Args.Name)
		if lc != Args.lc || wc != Args.wc || cc != Args.cc {
			t.Error("Wrong than expected", lc, wc, cc)
		}
		if !(err == Args.err || err.Error() == Args.err.Error()) {
			t.Error("Expected {}, but getting")
		}
	}
}


func TestGetCountWhenNoFile(t *testing.T) {
	fileargs := []FileArgs {
		{"", 0, 0, 0, errors.New("File not Found")},
	}
	for _, Args := range fileargs {
		cc, wc, lc, err := GetCount(Args.Name)
		if lc != Args.lc || wc != Args.wc || cc != Args.cc {
			t.Error("Wrong than expected", lc, wc, cc)
		}
		if !(err == Args.err || err.Error() == Args.err.Error()) {
			t.Error("Expected {}, but getting")
		}
	}
}


func TestGetCountWhenWrongFile(t *testing.T) {
	fileargs := []FileArgs {
		{"new.txt", 0, 0, 0, errors.New("File not Found")},
	}
	for _, Args := range fileargs {
		cc, wc, lc, err := GetCount(Args.Name)
		if lc != Args.lc || wc != Args.wc || cc != Args.cc {
			t.Error("Wrong than expected", lc, wc, cc)
		}
		if !(err == Args.err || err.Error() == Args.err.Error()) {
			t.Error("Expected {}, but getting")
		}
	}
}


type CommandArgs struct {
	Args []string
	Name string
	Cmd []string
	err error
}


func IsEqual(Actual []string, Expected []string) bool {
	if len(Actual) != len(Expected) {
		return false
	}
	for i := 0; i < len(Actual); i++ {
		if Actual[i] != Expected[i] {
			return false
		}
	}
	return true
}


func TestCommands(t *testing.T) {
	commandargs := []CommandArgs {
		{[]string {"mywc", "-l", "-w", "-c", "data.txt"}, "data.txt",
			[]string{"-c", "-l", "-w"}, nil},
		{[]string {"mywc", "-l", "-w", "data.txt"}, "data.txt",
			[]string{"-l", "-w"}, nil},
		{[]string {"mywc", "-l", "data.txt"}, "data.txt",
			[]string{"-l"}, nil},
	}
	for _, args := range commandargs {
		var cmd []string
		name, cmd, err := Commands(args.Args)
		if !(err == args.err || err.Error() == args.err.Error()) {
			t.Error("Wrong Commands", err)
		}
		if name != args.Name || !IsEqual(cmd, args.Cmd) {
			t.Error("Wrong Commands", name)
		}
	}
}


func TestCommandsWhenNoCmd(t *testing.T) {
	commandargs := []CommandArgs {
		{[]string {"mywc", "data.txt"}, "data.txt",
			[]string{}, nil},
	}
	for _, args := range commandargs {
		var cmd []string
		name, cmd, err := Commands(args.Args)
		if !(err == args.err || err.Error() == args.err.Error()) {
			t.Error("Wrong Commands", err)
		}
		if name != args.Name || !IsEqual(cmd, args.Cmd) {
			t.Error("Wrong Commands", name)
		}
	}
}


func TestCommandsWhenNoFile(t *testing.T) {
	commandargs := []CommandArgs {
		{[]string {"mywc", "-l", "-w"}, "",
			[]string{"-l", "-w"}, nil},
	}
	for _, args := range commandargs {
		var cmd []string
		name, cmd, err := Commands(args.Args)
		if !(err == args.err || err.Error() == args.err.Error()) {
			t.Error("Wrong Commands", err)
		}
		if name != args.Name || !IsEqual(cmd, args.Cmd) {
			t.Error("Wrong Commands", name)
		}
	}
}


func TestCommandsWhenWrongCmds(t *testing.T) {
	commandargs := []CommandArgs {
		{[]string {"mywc", "-l", "-w", "-c", "data.txt", "-x"}, "",
			[]string{"-c", "-l", "-w"}, errors.New("Invalid Command")},
		{[]string {"mywc", "-l", "-w", "-x", "data.txt"}, "data.txt",
			[]string{"-l", "-w"}, errors.New("Invalid Command")},
	}
	for _, args := range commandargs {
		var cmd []string
		name, cmd, err := Commands(args.Args)
		if !(err == args.err || err.Error() == args.err.Error()) {
			t.Error("Wrong Commands", err)
		}
		if name != args.Name || !IsEqual(cmd, args.Cmd) {
			t.Error("Wrong Commands", name)
		}
	}
}


func TestCommandsWhenWrongFile(t *testing.T) {
	commandargs := []CommandArgs {
		{[]string {"mywc", "-l", "-w", "-x", "data"}, "",
			[]string{"-l", "-w"}, errors.New("Invalid Command")},
	}
	for _, args := range commandargs {
		var cmd []string
		name, cmd, err := Commands(args.Args)
		if !(err == args.err || err.Error() == args.err.Error()) {
			t.Error("Wrong Commands", err)
		}
		if name != args.Name || !IsEqual(cmd, args.Cmd) {
			t.Error("Wrong Commands", name)
		}
	}
}
