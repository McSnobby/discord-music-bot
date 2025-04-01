import { CommandInteraction } from "discord.js";
import Bot from "../bot";
import { useQueue } from "discord-player";

export default async function stop(interaction: CommandInteraction, bot: Bot) {
    try {
        const queue = useQueue(bot.guildID)

        if (!queue) {
            await interaction.reply("There is nothing playing")
            return;
        }

        queue.node.stop(true)
        queue.clear()

        await interaction.reply("Stopped playing!")
    } catch (err) {
        bot.logger.log(3, err)
        await interaction.reply("An error occured")
    }
}
