const {
	checkRole,
	argumentMissing,
	missingRole,
} = require('../functions.js');

exports.clear = (message, args) => {

	if (checkRole(message, 'moderator') || checkRole(message, 'bot')) {
		const num = args[1];
		if (num) {
			if (num < 100) message.channel.bulkDelete(num);
			else message.channel.bulkDelete(99);
		}
		else {argumentMissing(message);}
	}
	else {missingRole(message);}

};