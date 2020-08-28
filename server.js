const http = require("http");
const express = require("express");
const app = express();

app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`https://Code By Professor.glitch.me/`);
}, 280000);

// كل البكجات الي ممكن تحتجها في اي بوت
const { Client, RichEmbed } = require("discord.js");
var { Util } = require("discord.js");
const { TOKEN, YT_API_KEY, prefix, devs } = require("./config");
const client = new Client({ disableEveryone: true });
const ytdl = require("ytdl-core");
const canvas = require("canvas");
const Canvas = require("canvas");
const convert = require("hh-mm-ss");
const fetchVideoInfo = require("youtube-info");
const botversion = require("./package.json").version;
const simpleytapi = require("simple-youtube-api");
const moment = require("moment");
const fs = require("fs");
const util = require("util");
const gif = require("gif-search");
const opus = require("node-opus");
const ms = require("ms");
const jimp = require("jimp");
const { get } = require("snekfetch");
const guild = require("guild");
const dateFormat = require("dateformat"); //npm i dateformat
const YouTube = require("simple-youtube-api");
const youtube = new YouTube("AIzaSyC3ie7bhhgY-xG1igcq4vZ734bBrZHUHYI");
const hastebins = require("hastebin-gen");
const getYoutubeID = require("get-youtube-id");
const yt_api_key = "AIzaSyC3ie7bhhgY-xG1igcq4vZ734bBrZHUHYI";
const pretty = require("pretty-ms");
client.login(TOKEN);
const queue = new Map();
var table = require("table").table;
const Discord = require("discord.js");
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


client.on('ready', () => {
  console.log(`the bot is ready and his neam ${client.user.username}!`);
    client.user.setPresence({
      activity:{
        name:"#help",
        type:"STREAMING",
        url:"https://www.twitch.tv/professor"
      }
    });
});

// By professor

client.on("message", async message => {
  if (message.content.startsWith(prefix + "help")) {
    let help = new Discord.RichEmbed().setColor("RANDOM")
      .setDescription(`** ❤❤ By PROFESSOR ❤❤
                الاوامر  ❤❤&❤❤  Command
             ✅  برودكاست عادي : ${prefix}bc✅ 
             ✅  برودكاست عادي : ${prefix}bco✅ 
             ===================================
             📛 **SUPPORT_SERVER** 📛
             🎉 https://discord.gg/eAdcBkQ 🎉
              **`);
    message.channel.sendEmbed(help);
  }
});

client.on("message", async message => {
  var command = message.content.split(" ")[0];
  command = command.slice(prefix.length);
  if (!message.channel.guild) return;
  var args = message.content
    .split(" ")
    .slice(1)
    .join(" ");
  if (command == "bc") {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send("**للأسف لا تمتلك صلاحية `ADMINISTRATOR`**");
    }
    if (!args) {
      return message.reply("**يجب عليك كتابة كلمة او جملة لإرسال البرودكاست**");
    }
    message.channel
      .send(
        `**هل أنت متأكد من إرسالك البرودكاست؟\nمحتوى البرودكاست: \`${args}\`**`
      )
      .then(m => {
        m.react("✅").then(() => m.react("❌"));

        let yesFilter = (reaction, user) =>
          reaction.emoji.name == "✅" && user.id == message.author.id;
        let noFiler = (reaction, user) =>
          reaction.emoji.name == "❌" && user.id == message.author.id;

        let yes = m.createReactionCollector(yesFilter);
        let no = m.createReactionCollector(noFiler);

        yes.on("collect", v => {
          m.delete();
          message.channel
            .send(
              `:ballot_box_with_check: | Done ... The Broadcast Message Has Been Sent For ${message.guild.memberCount} Members`
            )
            .then(msg => msg.delete(5000));
          message.guild.members.forEach(member => {
            let bc = new Discord.RichEmbed()
              .setColor("RANDOM")
              .setThumbnail(message.author.avatarURL)
              .setTitle("Broadcast")
              .addField("Server", message.guild.name)
              .addField("Sender", message.author.username)
              .addField("Message", args);

            member.sendEmbed(bc);
          });
        });
        no.on("collect", v => {
          m.delete();
          message.channel
            .send("**Broadcast Canceled.**")
            .then(msg => msg.delete(3000));
        });
      });
  }
  if (command == "bco") {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send("**للأسف لا تمتلك صلاحية `ADMINISTRATOR`**");
    }
    if (!args) {
      return message.reply("**يجب عليك كتابة كلمة او جملة لإرسال البرودكاست**");
    }
    message.channel
      .send(
        `**هل أنت متأكد من إرسالك البرودكاست؟\nمحتوى البرودكاست: \`${args}\`**`
      )
      .then(m => {
        m.react("✅").then(() => m.react("❌"));

        let yesFilter = (reaction, user) =>
          reaction.emoji.name == "✅" && user.id == message.author.id;
        let noFiler = (reaction, user) =>
          reaction.emoji.name == "❌" && user.id == message.author.id;

        let yes = m.createReactionCollector(yesFilter);
        let no = m.createReactionCollector(noFiler);

        yes.on("collect", v => {
          m.delete();
          message.channel
            .send(
              `:ballot_box_with_check: | Done ... The Broadcast Message Has Been Sent For ${
                message.guild.members.filter(
                  r => r.presence.status !== "offline"
                ).size
              } Members`
            )
            .then(msg => msg.delete(5000));
          message.guild.members
            .filter(r => r.presence.status !== "offline")
            .forEach(member => {
              let bco = new Discord.RichEmbed()
                .setColor("RANDOM")
                .setThumbnail(message.author.avatarURL)
                .setTitle("Broadcast")
                .addField("Server", message.guild.name)
                .addField("Sender", message.author.username)
                .addField("Message", args);

              member.sendEmbed(bco);
            });
        });
        no.on("collect", v => {
          m.delete();
          message.channel
            .send("**Broadcast Canceled.**")
            .then(msg => msg.delete(3000));
        });
      });
  }
});

