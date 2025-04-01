import dotenv from "dotenv"
import App from "./modules/app"
import { StdOutLogger } from "./modules/log"
import play from "./modules/handlers/play"
import { HandlerDict } from "./modules/types"
import stop from "./modules/handlers/stop"
import pause from "./modules/handlers/pause"
import skip from "./modules/handlers/skip"

dotenv.config()

const logger = new StdOutLogger()

const cmdHandlers: HandlerDict = {
    "play": play,
    "stop": stop,
    "pause": pause,
    "skip": skip,
}

const app = new App(logger, cmdHandlers)

app.load()

function handleShutdown() {
    app.shutdown()
    process.exit()
}

process.on("SIGINT", handleShutdown)
process.on("SIGTERM", handleShutdown)
process.on("SIGHUP", handleShutdown)


app.start()
