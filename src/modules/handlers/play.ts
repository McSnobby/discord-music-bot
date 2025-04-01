import { useMainPlayer } from "discord-player";
import { CommandInteraction } from "discord.js";
import Bot from "../bot";

export default async function play(interaction: CommandInteraction, bot: Bot) {
    await interaction.reply("Working on it...")
    const player = useMainPlayer()
    if (!interaction.member || !("voice" in interaction.member) || !interaction.member.voice.channel) {
        await interaction.editReply("You need to be in a guild voice channel to play music");
        return;
    }

    const song = interaction.options.get("song")?.value as string
    if (!song) {
        await interaction.editReply("You need to provide a song")
        return;
    }

    try {
        const { track, queue } = await player.play(interaction.member.voice.channel, song, {
            nodeOptions: {
                metadata: interaction

            }
        })

        if (queue.tracks.size > 0) {
            interaction.editReply(`Added ${track.title} to position ${queue.tracks.size}`)
            return;
        }
        interaction.editReply(`Playing ${track.title}`)

    } catch (err) {
        bot.logger.log(3, err)
        interaction.editReply("Error playing song")
    }
}
