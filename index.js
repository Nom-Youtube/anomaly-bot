const discord = require('discord.js');

const client = new discord.Client();

app.use(express.json({ extended:false }));

const hashmaps = require('hashmap');

const express = require('express');

const connectDB = require('./DB/connection');

const app = express();

const Port = process.env.Port || 3000;

app.listen(Port, () => console.log('Electron Listening On Port: ' + Port));

//connectDB();

app.use(express.json({ extended: false }));

const prefix = '-';

var secretString;

var hashmap = new hashmaps();

let secrets = [];

var secret = "";

var userID = "";

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }



client.on('ready', () => {
    connectDB();
    console.log('Bot is currently online!');
    

});

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ + /);

    const command = args.shift().toLowerCase();

    if(command === 'gen') {

        var secretString = makeid(16);
        
        if(hashmap.get(message.author.id)) {
            const secretEmbed = new discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Oops')
            .setDescription('Looks like you have a secret already!');

            message.author.send(secretEmbed);
        }
        else {
            const secretEmbed = new discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Secret (Make sure to keep this secret)')
            .setDescription('Here is your secret: ' + secretString);
            //hashmap.set(message.author.id, secretString);
            message.author.send(secretEmbed);
            message.author.id = userID;
            console.log(message.author.username + ' generated a secret: ' + secretString);

        }
         
    }
    if(command === 'reset') {
        if(message.author.username == 'Nom' || message.author.username == 'Aquestry') {
            const resetKey = new discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Reset Secrets!')
	.setDescription('You have reset all secrets.');
            //hashmap.clear();
            message.author.send(resetKey);
            console.log('[Warning] '+ message.author.username +  ' has reset all the secrets!')
        }
        else {
            message.author.send('Sorry you do not have access to this command!');
        }
        
    }
    if(command === 'help') {
            const help = new discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Help')
	.setDescription('Here is a list of commands:')
    .addField('-gen', 'Use This To Generate a Secret!', true)
    .addField('-reset', 'This Deletes All The Secrets', true)
    .addField('-secret', 'View the secret you generated!', true);
            message.channel.send(help);
        }
    if(command === 'secret') {

        if(hashmap.get(message.author.id)) {
            const secretStringEmbed = new discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('View Your Secret')
            .setDescription('Your secret is: ' + hashmap.get(message.author.id));
            message.author.send(secretStringEmbed);
        }
        else {
            const secretStringEmbed = new discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Oops')
            .setDescription('Looks like you haven\'t generated a secret!');
            message.author.send(secretStringEmbed);
        }
        
        
    }
    if(command === 'remove') {

        if(hashmap.get(message.author.id)) {
            const secretStringEmbed = new discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Removed')
            .setDescription('Your secret has been removed!');
            hashmap.delete(message.author.id);
            message.author.send(secretStringEmbed);
            console.log(message.author.username + ' removed their secret');
        }
        else {
            const removeEmbed = new discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Oops')
            .setDescription('You dont have a secret to remove! Try \'-gen\'');

            message.author.send(removeEmbed);
        }
        
        
    }
        
});

client.login('ODI3Mzg2NTc5NzMxNDgwNjEy.YGaRzA.4aTLmVRldjgNugibyzsifHwrHrc');

