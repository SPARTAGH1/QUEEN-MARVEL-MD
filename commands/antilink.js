const { bots } = require("../lib/antilink");
const { setAntilink, getAntilink, removeAntilink } = require("../lib/index");
const isAdmin = require("../lib/isAdmin");

async function handleAntilinkCommand(
  sock,
  chatId,
  userMessage,
  senderId,
  isSenderAdmin
) {
  try {
    if (!isSenderAdmin) {
      await sock.sendMessage(chatId, {
        text: "╔═══════════════════╗\n   👑 *ANTILINK* 👑\n╚═══════════════════╝\n\nOnly appointed administrators may adjust these protections!",
        mentions: [senderId],
      });
      return;
    }

    const prefix = ".";
    const args = userMessage.slice(9).toLowerCase().trim().split(" ");
    const action = args[0];

    if (!action) {
      const royalBanner = `
╔════════════════════════════════╗
  👑 *QUEEN MARVEL MD - ANTILINK* 👑
╚════════════════════════════════╝

⚜️ *Command Options:*
▸ ${prefix}antilink on - Activate protection
▸ ${prefix}antilink set delete|kick|warn - Set punishment
▸ ${prefix}antilink off - Deactivate protection
▸ ${prefix}antilink get - View current settings

✨ *Recommend:* \`delete\` for first offense`;
      await sock.sendMessage(chatId, { text: royalBanner });
      return;
    }

    switch (action) {
      case "on":
        const existingConfig = await getAntilink(chatId, "on");
        if (existingConfig?.enabled) {
          await sock.sendMessage(chatId, {
            text: "╔═══════════════════╗\n   🛡️ *NOTICE* 🛡️\n╚═══════════════════╝\n\nThe link defenses are already at full strength!",
          });
          return;
        }
        const result = await setAntilink(chatId, "on", "delete");
        await sock.sendMessage(chatId, {
          text: result
            ? "╔═══════════════════╗\n   🎉 *PROCLAMATION* 🎉\n╚═══════════════════╝\n\nThe link defenses have been raised! All links shall be purged."
            : "╔═══════════════════╗\n   ⚠️ *ALERT* ⚠️\n╚═══════════════════╝\n\nThe mages failed to conjure the protection spell!",
        });
        break;

      case "off":
        await removeAntilink(chatId, "on");
        await sock.sendMessage(chatId, {
          text: "╔═══════════════════╗\n   🌙 *DECREE* 🌙\n╚═══════════════════╝\n\nThe link defenses have been temporarily lowered.",
        });
        break;

      case "set":
        if (args.length < 2) {
          await sock.sendMessage(chatId, {
            text: "╔═══════════════════╗\n   ❗ *REMINDER* ❗\n╚═══════════════════╝\n\nYou must specify the punishment:\n\n▸ delete - Vanishes the message\n▸ kick - kicked the offender\n▸ warn - Issues a warning",
          });
          return;
        }
        const setAction = args[1];
        if (!["delete", "kick", "warn"].includes(setAction)) {
          await sock.sendMessage(chatId, {
            text: "╔═══════════════════╗\n   ❌ *ERROR* ❌\n╚═══════════════════╝\n\nThat is no known punishment to execute! Choose:\n\n▸ delete\n▸ kick\n▸ warn",
          });
          return;
        }
        const setResult = await setAntilink(chatId, "on", setAction);
        await sock.sendMessage(chatId, {
          text: setResult
            ? `╔═══════════════════╗\n   ⚖️ *JUDGMENT* ⚖️\n╚═══════════════════╝\n\nHenceforth, link offenders shall face:\n\n✨ *${setAction.toUpperCase()}* ✨`
            : "╔═══════════════════╗\n   ⚠️ *FAILURE* ⚠️\n╚═══════════════════╝\n\nThe scribes failed to record your decree!",
        });
        break;

      case "get":
        const status = await getAntilink(chatId, "on");
        const actionConfig = await getAntilink(chatId, "on");
        await sock.sendMessage(chatId, {
          text: `╔═══════════════════╗\n   📜 *RECORDS* 📜\n╚═══════════════════╝\n\n🛡️ *Protection Status:* ${
            status ? "ACTIVE" : "INACTIVE"
          }\n⚖️ *Punishment:* ${
            actionConfig ? actionConfig.action.toUpperCase() : "NOT SET"
          }\n\n${
            status
              ? "The defenses are well guarded!"
              : "The defenses are left unguarded!"
          }`,
        });
        break;

      default:
        await sock.sendMessage(chatId, {
          text: "╔═══════════════════╗\n   ❓ *GUIDANCE* ❓\n╚═══════════════════╝\n\nConsult the archives with:\n\n▸ .antilink\n▸ .antilink on\n▸ .antilink set <action>",
        });
    }
  } catch (error) {
    console.error("Antilink Error:", error);
    await sock.sendMessage(chatId, {
      text: "╔═══════════════════╗\n   💥 *MISHAP* 💥\n╚═══════════════════╝\n\nThe system stumbled while processing your command!",
    });
  }
}

async function handleLinkDetection(
  sock,
  chatId,
  message,
  userMessage,
  senderId
) {
  const antilinkSetting = getAntilinkSetting(chatId);
  if (antilinkSetting === "off") return;

  let shouldDelete = false;
  const linkPatterns = {
    whatsappGroup: /chat\.whatsapp\.com\/[A-Za-z0-9]{20,}/,
    whatsappChannel: /wa\.me\/channel\/[A-Za-z0-9]{20,}/,
    telegram: /t\.me\/[A-Za-z0-9_]+/,
    allLinks: /https?:\/\/[^\s]+/,
  };

  if (
    antilinkSetting === "whatsappGroup" &&
    linkPatterns.whatsappGroup.test(userMessage)
  ) {
    shouldDelete = true;
  } else if (
    antilinkSetting === "whatsappChannel" &&
    linkPatterns.whatsappChannel.test(userMessage)
  ) {
    shouldDelete = true;
  } else if (
    antilinkSetting === "telegram" &&
    linkPatterns.telegram.test(userMessage)
  ) {
    shouldDelete = true;
  } else if (
    antilinkSetting === "allLinks" &&
    linkPatterns.allLinks.test(userMessage)
  ) {
    shouldDelete = true;
  }

  if (shouldDelete) {
    const quotedMessageId = message.key.id;
    const quotedParticipant = message.key.participant || senderId;

    try {
      await sock.sendMessage(chatId, {
        delete: {
          remoteJid: chatId,
          fromMe: false,
          id: quotedMessageId,
          participant: quotedParticipant,
        },
      });

      const mentionedJidList = [senderId];
      await sock.sendMessage(chatId, {
        text: `╔═══════════════════╗\n   ⚠️ *CENSURE* ⚠️\n╚═══════════════════╝\n\n@${
          senderId.split("@")[0]
        }, your missive contained forbidden links!\n\n*This violates the decree!*`,
        mentions: mentionedJidList,
      });
    } catch (error) {
      console.error("Deletion Error:", error);
    }
  }
}

module.exports = {
  handleAntilinkCommand,
  handleLinkDetection,
};
