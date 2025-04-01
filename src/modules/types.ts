import { CommandInteraction } from "discord.js";
import Bot from "./bot";

export interface HandlerFunc {
    (interaction: CommandInteraction, bot: Bot): Promise<void>
}

export interface HandlerDict {
    readonly [key: string]: HandlerFunc
}

