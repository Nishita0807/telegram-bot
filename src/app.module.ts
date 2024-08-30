import { Module } from '@nestjs/common';
import { BotModule } from './bot/bot.module';
import { WeatherModule } from './weather/weather.module';
import { AdminModule } from './admin/admin.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    BotModule,
    WeatherModule,
    AdminModule,
    ScheduleModule.forRoot(),
  ],
})
export class AppModule {}
