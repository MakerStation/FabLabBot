const Discord = require("discord.js");

const roles = require("./roles.json").roles;

const projects = require("./projects.json").projects;

const colors = require("./colors.json").colors;

const token = require("./token.json").token;

const prefix = require("./prefix.json").prefix;

const bot = new Discord.Client();

const BLACK = [0, 0, 0];

var roleIds = {};
var roleNames = {};
var roleDescriptions = {};
var roleProjects = {};
var roleColors = {};

for(let i=0;i<roles.length;i++) {
    roleIds[roles[i].tag] = roles[i].id;
    roleNames[roles[i].tag] = roles[i].name;
    roleDescriptions[roles[i].tag] = roles[i].description;
    roleProjects[roles[i].tag] = roles[i].projects;
    roleColors[roles[i].tag] = roles[i].color;
}

var projectIds = {};
var projectNames = {};

for(let i=0;i<projects.length;i++) {
    projectIds[projects[i].tag] = projects[i].id;
    projectNames[projects[i].tag] = projects[i].name;
}

var colorValues = {};

for(let i=0;i<colors.length;i++) {
    colorValues[colors[i].tag] = colors[i].color;
}

function checkModeratorRole(message) {
    if(message.member.roles.member._roles.includes(roleIds["moderator"])) return true
    else return false;
}

function checkBotRole(message) {
    if(message.member.roles.member._roles.includes(roleIds["bot"])) return true
    else return false;
}

function wrongCommandError(message) {
    message.channel.send('The command doesn\'t exist');
}

function argumentMissingError(message) {
    message.channel.send('Missing argument');
}

function roleError(message) {
    message.channel.send('You don\'t have the permission to execute this command');
}

bot.on('ready', async () => {
    console.log('Bot online');
	bot.user.setActivity(prefix + 'help', { type: 'PLAYING' })
        .catch(console.error);
        
    //var channelTest = bot.channels.find(channel => channel.id === "732992314863124659");
    //channelTest.send("Test");
});

bot.on('message', message => {

    if(message.content.charAt(0) == prefix) {

        let args = message.content.substring(prefix.length).split(" ");
        let userRoles = message.member.roles.member._roles;
        let embed = new Discord.MessageEmbed();

        switch(args[0]) {
            case "help":
                
                embed.setTitle("Commands (prefix " + prefix + ")")
                .addField("help", "This message with all the available commands")
                .addField("ping", "Bot command latency")
                .addField("role", "Explains all your roles and projects");
                if(checkModeratorRole(message)) embed.addField("clear", "Clear the number of messages in the second argument (es. !clear 20)");
                
                message.channel.send(embed);
                break;

            case "ping":

                var ping = Date.now() - message.createdTimestamp + " ms";
                message.channel.send("Your ping is " + ping);

                break;

            case "clear":
                if(checkModeratorRole(message) || checkBotRole(message)) {
                    if(args[1]) {
                        if(args[1]<100) message.channel.bulkDelete(args[1])
                        else message.channel.bulkDelete(99);
                    }
                    else argumentMissingError(message);
                }
                else roleError(message);
                break;

            case "role":
                
                let color = BLACK;

                embed.setTitle("Your roles")
                .setThumbnail(message.author.avatarURL());

                for(let i =0;i<8;i++) {
                    let tag = roles[i].tag;
                    let id = roleIds[tag];
                    if(userRoles.includes(id) && roleProjects[tag]==undefined) {
                        embed.addField(roleNames[tag], roleDescriptions[tag]);
                        if(color == BLACK) color = colorValues[roleColors[tag]];
                    }
                    else if(userRoles.includes(id)) {
                        let description = roleDescriptions[tag];
                        roleProjects[tag].forEach(element => {
                            if(userRoles.includes(projectIds[element])) {
                                description += "\n- " + projectNames[element];
                            }
                        });
                        embed.addField(roleNames[tag], description);
                        if(color == BLACK) color = colorValues[roleColors[tag]];
                    }
                }

                embed.setColor(color);

                message.channel.send(embed);

                break;

            default:
                wrongCommandError(message);
                
                break;
        }

    }

});

bot.on("guildMemberAdd", member => {
    member.roles.add(roleIds["guest"]);
    //bot.guilds.get("689771563364384847").channels.get("690614414512226366").send("Welcome " + member.name + " to the FabLab's discord server");
});

bot.login(token);