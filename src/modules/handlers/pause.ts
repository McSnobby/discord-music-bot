import { CommandInteraction } from "discord.js";
import Bot from "../bot";
import { useQueue } from "discord-player";

export default async function pause(interaction: CommandInteraction, bot: Bot) {
    try {
        const queue = useQueue(bot.guildID)
        if (!queue) {
            await interaction.reply("There is nothing to pause or unpause")
            return;
        }

        const isPaused = queue.node.isPaused()
        queue.node.setPaused(!isPaused)
        await interaction.reply(`${isPaused ? "Unpaused" : "Paused"} the song`)
    } catch (err) {
        bot.logger.log(3, err)
        await interaction.reply("An error occured")
    }
}
