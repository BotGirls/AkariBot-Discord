const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config');
let lastStatus, channel;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    client.user.setActivity('ねじわさ✨💕', { //ここをいじればプレイ中のゲームの名前変えられるよ
        type: 'PLAYING'
    });
    channel = client.channels.find('name', config.channel);
});

client.on('presenceUpdate', (oldMember, newMember) => {
    let newM = Array.from(newMember.guild.presences);

    let i = 0;
    while (newM[i]) {
        if (newM[i][0] === config.target) {
            newM = newM[i][1];
            break;
        }
        i++;
    }
    if (lastStatus) {
        if (newM["status"] !== lastStatus["status"]) {
            console.log(lastStatus["status"] + " -> " + newM["status"]);
        }
    }

    lastStatus = JSON.parse(JSON.stringify(newM)); //参照をコピーじゃなくて複製したい
});

client.login(config.token);