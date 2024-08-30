import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { WeatherModule } from '../weather/weather.module';

@Module({
  imports: [WeatherModule],
  providers: [BotService],
})
export class BotModule {}
