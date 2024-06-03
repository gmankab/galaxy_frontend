// telegram.d.ts
interface TelegramWebApp {
  initDataUnsafe: {
    user?: {
      id: number;
      [key: string]: any;
    };
    [key: string]: any;
  };
  [key: string]: any;
}

interface Telegram {
  WebApp: TelegramWebApp;
}

interface Window {
  Telegram: Telegram;
}
