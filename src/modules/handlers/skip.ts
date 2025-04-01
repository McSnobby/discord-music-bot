import { CommandInteraction } from "discord.js";
import Bot from "../bot";
import { useQueue } from "discord-player";

export default async function skip(interaction: CommandInteraction, bot: Bot) {
    try {
        const queue = useQueue(bot.guildID)

        if (!queue || !queue.currentTrack) {
            await interaction.reply("There is no queue")
            return
        }
        const currentTrack = queue.currentTrack.title
        queue.node.skip()
        await interaction.reply(`Skipped ${currentTrack}`)

    } catch (err) {
        bot.logger.log(3, err)
        await interaction.reply("An error occured")
    }
}
