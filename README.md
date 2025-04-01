# A Discord Music bot

A simple discord music bot written in typescript.<br>
It mainly uses [discord.js](https://github.com/discordjs/discord.js) and [discord-player](https://github.com/Androz2091/discord-player)

It has youtube support through [discord-player-youtubei](https://github.com/retrouser955/discord-player-youtubei)

## Installation

### Create the bot

You have to create a discord application using the [discord developer portal](https://discord.com/developers/docs/intro)

### Run the bot

Clone the repository

`git clone https://github.com/McSnobby/discord-music-bot`

Then make a file called .env in the root folder with the following variables
```Shell
# Your discord bot tocken
AUTH_TOKEN=

# Your discord bot application id
APP_ID=

```

Then run the following commands to start the bot:
```
npm install

npm run build

npm run deploy

npm run start
```
Or in one command:

`npm install && npm run build && npm run deploy && npm run start`

Then you  can add the bot to the server and you're good to go

## Usage

The bot currently support the following commands

### /play
To play a song and add it to the queue

### /stop

To stop the playback and clear the queue

### /pause

To pause and unpause the music

### /skip

To skip to the next song in the queue

## Music locations

The bot supports the same locations as discord-players default extractors + youtube

## Notes

Pull requests are extreamly welcome!

This is my first actual Typescript project after failing to develop it in golang (broken modules)<br>
So mistakes and bugs are probably prevelent
