package main


import (
	"fmt"
	"io/ioutil"
	"os"
	"errors"
)


func GetSize(path string) int64 {
	if path == "" {
		return 0
	}
	files, err := ioutil.ReadDir(path)
	var size int64
	if err != nil {
		return 0
	}

	for _, file := range files {
		if file.IsDir() {
			size = size + GetSize(path + "/" + file.Name())
		} else {
			size = size + file.Size()
		}
	}
	return size
}


func IsValidArgs(Args []string) (bool, error) {
	if len(Args) < 2 {
		return false, errors.New("At least enter one directory name")
	}
	return true, nil
}


func SizeMB(size int64) (float32, string) {
	if size > 1073741824 {
		return float32(size) / (1073741824.0), "GB"
	}
	if size > 1048576 {
		return float32(size) / (1048576.0), "MB"
	}
	if size > 1024 {
		return float32(size) / (1024.0), "KB"
	}
	return 0.00, "B"
}


func main() {
	if _, err := IsValidArgs(os.Args); err != nil {
		fmt.Println(err)
		os.Exit(0)
	}
	home, _ := os.Getwd()
	for i := 1; i< len(os.Args); i++ {
		dirName := os.Args[i]
		_, err := ioutil.ReadDir(dirName)
		if err != nil {
			dirName = home + "/" + dirName
			_ , exist := ioutil.ReadDir(dirName)
			if exist != nil {
				fmt.Println(dirName, " Directory not found")
				continue
			}
		}
		dirSize, sizeType := SizeMB(GetSize(dirName))
		fmt.Println(dirName, dirSize, sizeType)
	}
}
