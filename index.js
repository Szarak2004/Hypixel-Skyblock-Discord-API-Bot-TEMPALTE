require("dotenv").config();
const fs = require("fs");
const rp = require("request-promise");
const req = require("request");
const Discord = require("discord.js");
const client = new Discord.Client();
const key = process.env.api_key;
const token = process.env.token;
var undefine;
var ign = "";
var UUID;

function getPlayerByName(key, ign) {
  var apiUrl =
    "https://api.hypixel.net/skyblock/profile?key=" + key + "&profile=" + UUID;
  return rp(apiUrl).then((body) => {
    return JSON.parse(body).profile.members[UUID].stats.deaths;
  });
}
//Getting all skyblock player info ^^^
function getUUID(ign) {
  var UUIDUrl = "https://api.mojang.com/users/profiles/minecraft/" + ign;
  rp(UUIDUrl).then((data) => {
    UUID = JSON.parse(data).id;
    return;
  });
}

//Getting the UUID from ign ^^^
client.login(token);

client.on("ready", () => {
  console.log(`Hi, ${client.user.username} is now online!`);

  // Set the user presence
  client.user.setActivity("me being developed :)", { type: "WATCHING" });
});

client.on("message", async (message) => {
  const prefix = "_";

  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd === "deaths") {
    // Send a message
    ign = args[0];
    getUUID(ign);
    var intvl = setInterval(function () {
      if (!UUID) {
        clearInterval(intvl);
        message.channel.send("Player not found!");
      } else {
        clearInterval(intvl);
        getPlayerByName(key, ign)
          .then((player) => {
            message.channel.send("Deathcount of " + ign + ": " + player);
            UUID = undefine;
            ign = undefine;
            return;
          })
          .catch((err) => {
            console.log("ERROR: " + err);
          });
      }
    }, 2000);
  }
});
