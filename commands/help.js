const prefix = require('../prefix.json').prefix;
const checkRole = require('../functions').checkRole;

exports.help = (message, embed) => {

	embed.setTitle('Commands (prefix ' + prefix + ')')
		.addField('help', 'This message with all the available commands')
		.addField('ping', 'Bot command latency')
		.addField('role', 'Explains all your roles and projects');
	if (checkRole(message, 'moderator')) embed.addField('clear', 'Clear the number of messages in the second argument (es. !clear 20)');

	message.channel.send(embed);

};