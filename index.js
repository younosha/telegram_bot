const { Telegraf, Markup } = require('telegraf')
const consts = require('./consts')
require('dotenv').config()

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.replyWithHTML(`
Привет, ${ctx.message.from.first_name ? ctx.message.from.first_name : 'незнакомец'}!)
Я помогу тебе выбрать и подключить подписку.
Чтобы посмотреть список доступных подписок отправь команду: /subscriptions
`))
bot.help((ctx) => ctx.reply(consts.commands))
bot.command('subscriptions', async (ctx) => {
    try {
        await ctx.replyWithHTML('<b>Доступные подписки на наш VPN сервер:</b>', Markup.inlineKeyboard([
            [Markup.button.callback('Месяц', 'btn_1'), Markup.button.callback('Год', 'btn_2')]
        ]))
    } catch (error) {
        ctx.replyWithHTML(`<b>Ошибка:</b> ${error.response.description}`)
    }
})
bot.action('btn_1', async (ctx) => {
    try {
        ctx.answerCbQuery();
        await ctx.reply('Вы подключили месячную подписку!');
    } catch (error) {
        ctx.replyWithHTML(`<b>Ошибка:</b> ${error.response.description}`)
    }
})
bot.action('btn_2', async (ctx) => {
    try {
        ctx.answerCbQuery();
        await ctx.reply('Вы подключили годовую подписку!');
    } catch (error) {
        ctx.replyWithHTML(`<b>Ошибка:</b> ${error.response.description}`)
    }
})
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))