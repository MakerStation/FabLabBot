const Discord = require('discord.js');
const bot = new Discord.Client();

const {
	wrongCommand,
	role,
} = require('./functions');

const {
	help,
} = require('./commands/help');
const {
	ping,
} = require('./commands/ping');
const {
	clear,
} = require('./commands/clear');
const {
	printRoles,
} = require('./commands/role');

const token = require('./token.json').token;

const prefix = require('./prefix.json').prefix;


bot.once('ready', async () => {
	console.log('Bot online');
	bot.user.setActivity(prefix + 'help', {
		type: 'PLAYING',
	}).catch(console.error);
});

bot.on('message', message => {

	if (message.content.startsWith(prefix)) {

		const args = message.content.substring(prefix.length).split(' ');
		const embed = new Discord.MessageEmbed();

		switch (args[0]) {
		case 'help':

			help(message, embed);

			break;

		case 'ping':

			ping(message);

			break;

		case 'clear':
			clear(message, args);
			break;

		case 'role':
			printRoles(message, embed);

			break;

		default:
			wrongCommand(message);

			break;
		}

	}

});

bot.on('guildMemberAdd', member => {
	member.roles.add(role['ids']['guest']);
});

bot.login(token);