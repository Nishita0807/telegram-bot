import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('admin')
export class AdminController {
  @Get('google/login')
  @UseGuards(AuthGuard('google'))
  googleLogin() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback() {
    return { msg: 'Google Authentication Successful' };
  }

  @Post('block-user')
  blockUser(@Body() body) {
    const { userId } = body;
    // Logic to block user from receiving weather updates
  }

  @Post('update-settings')
  updateSettings(@Body() body) {
    const { weatherApiKey, telegramBotToken } = body;
    // Logic to update bot settings
  }
}
