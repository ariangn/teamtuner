import { Client, GatewayIntentBits, Partials, TextChannel } from 'discord.js';

// DiscordボットのトークンとチャンネルIDを設定
const DISCORD_TOKEN = 'YOUR_DISCORD_BOT_TOKEN';
const CHANNEL_ID = 'YOUR_DISCORD_CHANNEL_ID';

// Discordクライアントの設定とログイン
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
});

// Discordにメッセージを送信する関数
export function sendErrorToDiscord() {
    const channel = client.channels.cache.get(CHANNEL_ID) as TextChannel;
    if (channel) {
        channel.send('error: script');
    }
}
