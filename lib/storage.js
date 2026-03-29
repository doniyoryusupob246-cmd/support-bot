import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_PATH = path.join(DATA_DIR, 'messages.json');

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_PATH)) {
    fs.writeFileSync(DATA_PATH, JSON.stringify([], null, 2));
  }
}

export function saveMessage(data) {
  try {
    ensureDataFile();
    const file = fs.readFileSync(DATA_PATH, 'utf-8');
    const messages = JSON.parse(file);
    messages.push(data);
    fs.writeFileSync(DATA_PATH, JSON.stringify(messages, null, 2));
  } catch (err) {
    console.error('Ошибка сохранения:', err);
  }
}
