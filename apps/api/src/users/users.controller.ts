import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { SessionAuthGuard } from 'src/auth/guards/session-auth.guard.js';
import { UsersService } from './users.service.js';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/')
  @UseGuards(SessionAuthGuard)
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Delete(':id')
  async deleteUserById(@Param('id') userId: string) {
    return await this.userService.deleteUserById(userId);
  }

  @UseGuards(SessionAuthGuard)
  @Get('/profile')
  getUserProfile() {
    return {
      message: 'Hello you can go crazy to access me',
    };
  }
}
