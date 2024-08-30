import { Injectable} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WeatherService {
  constructor(private httpService: HttpService) {}

  async getDailyWeather() {
    const apiKey = process.env.WEATHER_API_KEY;
    const city = 'India'; // You can make this dynamic based on user location
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await firstValueFrom(this.httpService.get(url));
    return `Temp: ${response.data.main.temp}, Weather: ${response.data.weather[0].description}`;
  }
}
