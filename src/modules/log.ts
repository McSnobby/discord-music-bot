import { ReadOnlyDict } from "./types"


export default interface Logger {
    log(level: number | LogLevel, message: any): void
}

// Aliases for those who like to be explicit
export enum LogLevel {
    Emergency = 0,
    Alert = 1,
    Critical = 2,
    Error = 3,
    Warning = 4,
    Notice = 5,
    Info = 6,
    Debug = 7,
}


export class StdOutLogger implements Logger {
    private levelMap: ReadOnlyDict = {
        0: "Emergency",
        1: "Alert",
        2: "Critical",
        3: "Error",
        4: "Warning",
        5: "Notice",
        6: "Info",
        7: "Debug"
    }

    log(level: number | LogLevel, message: any): void {
        const strLevel = this.levelMap[level]
        if (level <= 3) {
            console.log(`level: ${strLevel}`)
            console.error("Error: " + message)
            return
        }
        console.log(`level: ${strLevel}`)
        console.log(`Message: ${message}`)

    }
}

