import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as TelegramBot from 'node-telegram-bot-api';
import { WeatherService } from '../weather/weather.service';

@Injectable()
export class BotService {
  private bot: TelegramBot;
  private readonly logger = new Logger(BotService.name);
  private subscribers: Set<number> = new Set();

  constructor(private weatherService: WeatherService) {
    this.bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

    this.bot.onText(/\/subscribe/, (msg) => {
      const chatId = msg.chat.id;
      this.subscribers.add(chatId);
      this.bot.sendMessage(chatId, 'You have subscribed to daily weather updates!');
    });

    this.bot.onText(/\/unsubscribe/, (msg) => {
      const chatId = msg.chat.id;
      this.subscribers.delete(chatId);
      this.bot.sendMessage(chatId, 'You have unsubscribed from daily weather updates.');
    });
  }

  // Send daily weather updates to all subscribers
  @Cron('10 15 * * *') // Runs every day at 3:00 PM
  async sendDailyWeather() {
    for (const chatId of this.subscribers) {
      const weatherUpdate = await this.weatherService.getDailyWeather();
      this.bot.sendMessage(chatId, `Today's weather: ${weatherUpdate}`);
    }
  }
}
