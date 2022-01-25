package main

import (
	"context"
	"fmt"
)

type keyType string

func main() {
	key := keyType("Name")
	ctx := context.WithValue(context.Background(), key, "Tobyy")
	exampleContext(ctx, key)
}

func exampleContext(ctx context.Context, k keyType) {
	value := ctx.Value(k)
	if value != nil {
		fmt.Print("The context value is :", value)
		return
	}
	fmt.Print("Ooooops, unable to find the context value")
}
