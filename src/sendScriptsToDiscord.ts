import * as dotenv from 'dotenv';
import { Client, GatewayIntentBits, Partials, TextChannel } from 'discord.js';
import * as fs from 'fs';
import * as vscode from 'vscode';

dotenv.config();

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const CHANNEL_ID = process.env.DISCORD_CHANNEL_ID;

if (!DISCORD_TOKEN) {
    throw new Error("DISCORD_TOKEN is not defined in the environment variables.");
}

if (!CHANNEL_ID) {
    throw new Error("DISCORD_CHANNEL_ID is not defined in the environment variables.");
}

export function sendMessageToDiscord() {
    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent
        ],
        partials: [Partials.Channel]
    });

    client.login(DISCORD_TOKEN);

    client.once('ready', () => {
        console.log('Discord bot is ready!');

        const channelId = CHANNEL_ID as string;
        const channel = client.channels.cache.get(channelId) as TextChannel;

        console.log('DISCORD_TOKEN:', DISCORD_TOKEN);  // デバッグ用ログ
        console.log('CHANNEL_ID:', CHANNEL_ID);        // デバッグ用ログ

        if (!channel) {
            vscode.window.showErrorMessage('Error: Channel not found');
            return;
        }

        fs.readFile(__dirname + '/toDiscordMessage.json', 'utf8', (err, data) => {
            if (err) {
                vscode.window.showErrorMessage('Error reading JSON file');
                return;
            }
            channel.send(data);
        });
    });
}
