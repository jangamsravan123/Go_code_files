package main


import (
	"github.com/rs/zerolog/log"
	"github.com/rs/zerolog"
	"fmt"
	"errors"
	"os"
//	"io/ioutil"
)


func main() {
   // zerolog.TimeFieldFormat = zerolog.TimeFormatUnix
	log.Logger = log.Output(zerolog.ConsoleWriter{Out: os.Stderr})
	//log.SetFlags(log.Ldate | log.Llongfile)
	log.Print("this is Logging with Zerolog")
	fmt.Println()
	fmt.Println("Seven Levels")
	log.Info().Msg("this is info")
//	log.Panic().Msg("this is Panic message")	//5
//	log.Fatal().Msg("This is a Fatal Message")	//4
	log.Error().Msg("This is a error message")	//3
	log.Warn().Msg("this is Warn Message")		//2
	log.Info().Msg("this is info message")		//1
	log.Debug().Msg("this is debug message")	//0
	log.Trace().Msg("this is trace message")	//-1

	fmt.Println()
	fmt.Println("more Filed in logs")
	log.Info().Str("mystr","this is the string").Msg("")
	log.Info().Int("value", 321456).Msg("")
	log.Info().Int("value", 324567).
		Str("mystr", "this is mystring").
		Msg("this is the Mesaage")

	fmt.Println()
	fmt.Println("Adding Error field")
	log.Info().Err(errors.New("this is an error")).Msg("error filed added")

	fmt.Println()
	mainLogger := zerolog.New(os.Stderr).With().Logger()
	mainLogger.Info().Str("name", "Information").Msg("this is from main logger")

	fmt.Println()

	fmt.Println("setting level ")
	zerolog.SetGlobalLevel(zerolog.InfoLevel)
	log.Info().Str("name", "Info level").Msg("this is info level")
	log.Debug().Msg("this is debug level")
	log.Error().Msg("this is error level")
	log.Trace().Msg("this is trac")

	Log_File := "./myfile"
	logFile, err := os.OpenFile(Log_File, os.O_APPEND | os.O_RDWR |os.O_CREATE, 0644)
	//logWriter, err := syslog.New(syslog.LOG_SYSLOG, "my Awesome app")
	if err != nil {
		log.Fatal().Msg("unable to set lofgile")
	}
	//log.SetOutput(logWriter)
//	log.SetOutput(logFile)
	fileLogger := zerolog.New(logFile).With().Timestamp().Logger()
	fileLogger.Info().Msg("this will be saved into file")
}


