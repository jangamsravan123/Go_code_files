package main


import (
	"testing"
)


func TestIsValidArgs(t *testing.T) {
	val, _ := IsValidArgs([]string{"diskuse", "home", "Golang"})
	if val != true {
		t.Error("Expected and actual are not same")
	}
}


func TestIsValidArgsWhenNoDir(t *testing.T) {
	val, _ := IsValidArgs([]string{"diskuse"})
	if val != false {
		t.Error("Expected and actual are not same")
	}
}


type GetSizeArgs struct {
	path string
	size int64
}


func TestGetSize(t *testing.T) {
	Args := []GetSizeArgs {
		{"/home/sravan/Downloads", 4431465},
		{"/home", 141985550},
	}
	for _, Path := range Args {
		val := GetSize(Path.path)
		if val != Path.size {
			t.Error("Expected and actual are not same", val, Path.size)
		}
	}
}


func TestGetSizeWhenHomeDir(t *testing.T) {
	Args := []GetSizeArgs {
		{"/home", 141985550},
	}
	for _, Path := range Args {
		if GetSize(Path.path) != Path.size {
			t.Error("Expected and actual are not same")
		}
	}
}


func TestGetSizeWhenWrongDir(t *testing.T) {
	Args := []GetSizeArgs {
		{"/home/sravan/Downloads/Golang", 0},
		{"/home/sravan/mydir", 0},
	}
	for _, Path := range Args {
		if GetSize(Path.path) != Path.size {
			t.Error("Expected and actual are not same")
		}
	}
}


func TestGetSizeWhenNoDir(t *testing.T) {
	Args := []GetSizeArgs {
		{"", 0},
	}
	for _, Path := range Args {
		if GetSize(Path.path) != Path.size {
			t.Error("Expected and actual are not same")
		}
	}
}


type sizeMbArgs struct {
	size int64 
	sizeMb float32
	sizeType string
}


func TestSizeMB(t *testing.T) {
	Args := []sizeMbArgs {
		{1023456, 999.46875, "KB"},
		{46758909,44.59277, "MB"},
	}
	for _, args := range Args {
		sizeMb, sizeType := SizeMB(args.size)
		if sizeMb != args.sizeMb || sizeType != args.sizeType {
			t.Error("Expectedc and actual are not same", sizeMb, sizeType)
		}
	}
}


func TestSizeMBWhenKB(t *testing.T) {
	Args := []sizeMbArgs {
		{1023456, 999.46875, "KB"},
	}
	for _, args := range Args {
		sizeMb, sizeType := SizeMB(args.size)
		if sizeMb != args.sizeMb || sizeType != args.sizeType {
			t.Error("Expectedc and actual are not same", sizeMb, sizeType)
		}
	}
}


func TestSizeMBWhenMB(t *testing.T) {
	Args := []sizeMbArgs {
		{1023456678, 976.0444, "MB"},
	}
	for _, args := range Args {
		sizeMb, sizeType := SizeMB(args.size)
		if sizeMb != args.sizeMb || sizeType != args.sizeType {
			t.Error("Expectedc and actual are not same", sizeMb, sizeType)
		}
	}
}


func TestSizeMBWhenGB(t *testing.T) {
	Args := []sizeMbArgs {
		{44023456678, 41.00004, "GB"},
	}
	for _, args := range Args {
		sizeMb, sizeType := SizeMB(args.size)
		if sizeMb != args.sizeMb || sizeType != args.sizeType {
			t.Error("Expectedc and actual are not same", sizeMb, sizeType)
		}
	}
}
