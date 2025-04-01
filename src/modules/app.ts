import { Client, CommandInteraction, GatewayIntentBits, Partials, VoiceState } from "discord.js";
import Logger from "./log";
import { HandlerDict } from "./types";
import Bot from "./bot";
import { Player, PlayerEvent, useMainPlayer } from "discord-player";
import { YoutubeiExtractor } from "discord-player-youtubei";
import { DefaultExtractors } from "@discord-player/extractor";


export default class App {

    private client: Client
    private handlers: HandlerDict
    private bots: Map<string, Bot>
    private player: Player
    logger: Logger


    constructor(logger: Logger, handlers: HandlerDict) {
        this.logger = logger
        this.handlers = handlers

        this.bots = new Map()

        this.client = new Client({
            intents: [

                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildVoiceStates,
                GatewayIntentBits.GuildMessages
            ],
            partials: [Partials.Channel, Partials.GuildMember],
        });
        this.player = new Player(this.client)

        this.player.on(PlayerEvent.debug, (msg) => this.logger.log(7, msg))



    }

    public async load() {
        await this.player.extractors.loadMulti([YoutubeiExtractor, ...DefaultExtractors])
    }

    private getBot(guildId: string): Bot {
        var b = this.bots.get(guildId)
        if (!b) {
            b = new Bot(guildId, this.logger)
            this.bots.set(guildId, b)
        }
        return b
    }

    public start(): void {
        this.client.once("ready", () => {
            this.logger.log(6, `Logged in as ${this.client.user?.tag}`);
        })

        this.client.on("guildCreate", (guild) => {
            if (this.bots.has(guild.id)) return;
            this.bots.set(guild.id, new Bot(guild.id, this.logger))
        })

        this.client.on("interactionCreate", async (interaction) => {
            if (!interaction.isCommand() || !(interaction.guildId)) return;
            const h = this.handlers[interaction.commandName];
            if (h === undefined) return;
            await h(interaction, this.getBot(interaction.guildId));
        })

        this.client.login(process.env.AUTH_TOKEN)
    }

    public shutdown() {
        this.player.destroy()
        this.client.destroy()
    }
}
