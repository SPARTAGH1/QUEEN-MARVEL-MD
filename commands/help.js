const settings = require("../settings");
const fs = require("fs");
const path = require("path");
const os = require("os");
const moment = require("moment-timezone");

async function helpCommand(sock, chatId, message) {
  global.whatsappChannelLink =
    "https://whatsapp.com/channel/0029VbB7Tsa6WaKgDuGsnO1u";
  // Calculate system stats
  const uptime = moment.duration(process.uptime(), "seconds").humanize();
  const memoryUsage = process.memoryUsage().rss;
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const platform = `${os.platform()} ${os.release()}`;
  const currentTime = moment().tz("Asia/Kolkata").format("h:mm A");
  const currentDate = moment().tz("Asia/Kolkata").format("DD/MM/YYYY");
  const day = moment().tz("Asia/Kolkata").format("dddd");
  const userInfo = message.pushName || "Queen Marvel User";
  const totalCommands = 104;
  const avgSpeed = "0.35s";

  // Format memory information with percentage
  const formatMemory = (bytes) => `${Math.round(bytes / 1024 / 1024)}MB`;
  const usedPercentage = Math.round((memoryUsage / totalMemory) * 100);
  const freePercentage = Math.round((freeMemory / totalMemory) * 100);
  const memoryInfo = ` ${formatMemory(memoryUsage)}/${formatMemory(
    totalMemory
  )} (${freePercentage}% free, ${usedPercentage}% used)`;

  const helpMessage = `
✦━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━✦
        👑✨ 𝐐𝐔𝐄𝐄𝐍 𝐌𝐀𝐑𝐕𝐄𝐋 𝐌𝐃 ✨👑
✦━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━✦
✦ 𝖁𝖊𝖗𝖘𝖎𝖔𝖓: ${settings.version || "2.0"} 
✦ 𝕯𝖊𝖛𝖊𝖑𝖔𝖕𝖊𝖗: ${settings.botOwner || "Tife Tech"}
✦ 𝕮𝖔𝖒𝖒𝖆𝖓𝖉𝖘: ${totalCommands}
✦ 𝖀𝖕𝖙𝖎𝖒𝖊: ${uptime}
✦ 𝕾𝖕𝖊𝖊𝖉: ${avgSpeed}
✦ 𝕿𝖎𝖒𝖊: ${currentTime} (${currentDate})
✦ 𝕯𝖆𝖞: ${day}
✦ 𝕻𝖑𝖆𝖙𝖋𝖔𝖗𝖒: ${platform}
✦ 𝕸𝖊𝖒𝖔𝖗𝖞: ${memoryInfo}
✦ 𝖀𝖘𝖊𝖗: ${userInfo}
✦ 𝕻𝖗𝖊𝖋𝖎𝖝: ${settings.prefix || "."}
⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅⋅

╔════════════════════════════════╗
  🧠 𝔸𝕣𝕥𝕚𝕗𝕚𝕔𝕚𝕒𝕝 𝕀𝕟𝕥𝕖𝕝𝕝𝕚𝕘𝕖𝕟𝕔𝕖
╚════════════════════════════════╝
🔮 .gpt 5 
🔮 .gemini 
🔮 .imagine
🔮 .flux 

╔════════════════════════════════╗
  🏰 ℂ𝕠𝕣𝕖 ℂ𝕠𝕞𝕞𝕒𝕟𝕕𝕤 
╚════════════════════════════════╝
✨ .menu 
✨ .ping
✨ .alive
✨ .tts <text>
✨ .owner
✨ .joke 
✨ .quote 
✨ .fact 
✨ .weather <city> 
✨ .news 
✨ .attp <text> 
✨ .lyrics <song> 
✨ .groupinfo 
✨ .admins 
✨ .vv 
✨ .trt <text> 
✨ .ss <link> 
✨ .jid 
✨ .autosend

╔════════════════════════════════╗
  👑 ℂ𝕦𝕤𝕥𝕠𝕞𝕚𝕫𝕒𝕥𝕚𝕠𝕟 
╚════════════════════════════════╝
💎 .mode
💎 .autostatus 
💎 .clearsession 
💎 .antidelete 
💎 .cleartmp 
💎 .setpp 
💎 .autoreact 

╔════════════════════════════════╗
  ⚜️ 𝔸𝕕𝕞𝕚𝕟 𝕋𝕠𝕠𝕝𝕤
╚════════════════════════════════╝
🗡️ .ban @user
🗡️ .promote @user
🗡️ .demote @user
🗡️ .mute <mins>
🗡️ .unmute
🗡️ .delete
🗡️ .kick @user
🗡️ .warnings
🗡️ .warn @user 
🗡️ .antilink
🗡️ .antibadword
🗡️ .clear
🗡️ .tag
🗡️ .tagall
🗡️ .chatbot
🗡️ .resetlink
🗡️ .welcome
🗡️ .goodbye

╔════════════════════════════════╗
  🎨𝕄𝕖𝕕𝕚𝕒 𝕋𝕠𝕠𝕝𝕤
╚════════════════════════════════╝
🎭 .blur
🎭 .simage
🎭 .sticker
🎭 .tgsticker
🎭 .meme
🎭 .take
🎭 .emojimix

╔════════════════════════════════╗
  🎮 𝔾𝕒𝕞𝕖𝕤
╚════════════════════════════════╝
♟️ .tictactoe
♟️ .hangman
♟️ .guess
♟️ .trivia
♟️ .answer
♟️ .truth
♟️ .dare

╔════════════════════════════════╗
  🎪 𝔼𝕟𝕥𝕖𝕣𝕥𝕒𝕚𝕟𝕞𝕖𝕟𝕥
╚════════════════════════════════╝
🎭 .compliment
🎭 .insult
🎭 .flirt
🎭 .shayari
🎭 .goodnight
🎭 .roseday
🎭 .character
🎭 .wasted
🎭 .ship
🎭 .simp
🎭 .stupid

╔════════════════════════════════╗
  ✨ 𝕋𝕖𝕩𝕥 𝔸𝕣𝕥
╚════════════════════════════════╝
🖋️ .metallic
🖋️ .ice
🖋️ .snow
🖋️ .impressive
🖋️ .matrix
🖋️ .light
🖋️ .neon
🖋️ .devil
🖋️ .purple
🖋️ .thunder
🖋️ .leaves
🖋️ .1917
🖋️ .arena
🖋️ .hacker
🖋️ .sand
🖋️ .blackpink
🖋️ .glitch
🖋️ .fire

╔════════════════════════════════╗
  📜 𝕄𝕖𝕕𝕚𝕒 𝔻𝕠𝕨𝕟𝕝𝕠𝕒𝕕
╚════════════════════════════════╝
🎵 .play
🎵 .song
🎵 .instagram
🎵 .facebook
🎵 .tiktok
🎵 .video
🎵 .ytmp4

╔════════════════════════════════╗
  💻 ℝ𝕖𝕡𝕠𝕤𝕚𝕥𝕠𝕣𝕪
╚════════════════════════════════╝
👨‍💻 .git
👨‍💻 .github
👨‍💻 .repo

✦━━━━━━━━━━━━━━━━━━━━━━━━━━━✦
   👑 *Queen Marvel MD* 👑
✦━━━━━━━━━━━━━━━━━━━━━━━━━━━✦

> ◈ 𝐏𝐎𝗪𝐄𝐑𝐄𝐃 𝐁𝐘 𝐓𝐈𝐅𝐄 𝐓𝐄𝐂𝐇 ◈

 `;

  try {
    const imagePath = path.join(__dirname, "../assets/v1.png");
    const buttons = [
      {
        urlButton: {
          displayText: "👑 Join Channel",
          url: global.whatsappChannelLink,
        },
      },
      {
        urlButton: {
          displayText: "💬 WhatsApp Group",
          url: global.whatsappGroupLink,
        },
      },

      {
        quickReplyButton: {
          displayText: "⚔️ Support",
          id: "!support",
        },
      },
    ];

    if (fs.existsSync(imagePath)) {
      const imageBuffer = fs.readFileSync(imagePath);
      await sock.sendMessage(
        chatId,
        {
          image: imageBuffer,
          caption: helpMessage,
          contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: "0029VbB7Tsa6WaKgDuGsnO1u@newsletter",
              newsletterName: "QUEEN MARVEL MD 👑",
              serverMessageId: -1,
            },
          },
          templateButtons: buttons,
        },
        { quoted: message }
      );
    } else {
      await sock.sendMessage(chatId, {
        text: helpMessage,
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: "0029VbB7Tsa6WaKgDuGsnO1u@newsletter",
            newsletterName: "QUEEN MARVEL MD 👑",
            serverMessageId: -1,
          },
        },
        templateButtons: buttons,
      });
    }
  } catch (error) {
    console.error("Command Error:", error);
    await sock.sendMessage(chatId, {
      text: helpMessage,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
      },
    });
  }
}

module.exports = helpCommand;
