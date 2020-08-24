const Telegraf = require('telegraf');
const config = require('./config.json');

const Client = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});

const bot = new Telegraf(config.token);

bot.start((ctx) => ctx.reply(config.welcome));
// bot.help((ctx) => ctx.reply('Send me a sticker'));
// bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears('👍', (ctx) => ctx.reply(config.first));
bot.hears('Y', (ctx) => ctx.reply(config.good));
bot.hears('X', (ctx) => ctx.reply(ctx.message.chat.id));
bot.launch();