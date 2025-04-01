import { REST, Routes, SlashCommandBuilder } from "discord.js";
import { config } from "dotenv"
config()

const commands = [
    new SlashCommandBuilder()
        .setName("play")
        .setDescription("Play a song in your voice channel")
        .addStringOption(option =>
            option.setName("song")
                .setDescription("The song you would like to play")
                .setRequired(true)
        ),
    new SlashCommandBuilder()
        .setName("stop")
        .setDescription("Stop the playback"),
    new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Skip the current song"),
    new SlashCommandBuilder()
        .setName("pause")
        .setDescription("Pause or unpause the song"),
].map(cmd => cmd.toJSON());

const token = process.env?.AUTH_TOKEN;
if (!token) {
    throw new Error("Must supply an auth token");

};
const rest = new REST({ version: "10" }).setToken(token);

const appID = process.env?.APP_ID;
if (!appID) {
    throw new Error("Must supply app id");

}
async function registerCommands() {
    try {
        console.log("Registering slash commands...");
        await rest.put(
            Routes.applicationCommands(appID as string),
            { body: commands }
        );
        console.log("Commands registered!");
    } catch (error) {
        console.error(error);
    }
}
registerCommands();
