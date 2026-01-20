import fs from 'fs';
import path from 'path';

const filePath = path.resolve('data/messages.json');

export function readMessages() {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

export function saveMessages(messages) {
  fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));
}

export function addMessage(adminMessageId, userChatId) {
  const messages = readMessages();
  messages.push({
    adminMessageId,
    userChatId,
  });
  saveMessages(messages);
}

export function getUserChatId(adminMessageId) {
  const messages = readMessages();
  const item = messages.find((m) => m.adminMessageId === adminMessageId);
  return item?.userChatId;
}
