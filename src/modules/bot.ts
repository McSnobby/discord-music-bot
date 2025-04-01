import Logger from "./log";


export default class Bot {

    logger: Logger
    guildID: string
    constructor(guildID: string, logger: Logger) {
        this.logger = logger
        this.guildID = guildID
    }

}
