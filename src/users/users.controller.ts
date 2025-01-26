import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequest } from './dto/create-user-request';
import { ValidationService } from 'src/common/validation.service';
import { UserValidator } from './users.validator';

@Controller('users')
export class UsersController {
  constructor(
    private readonly validationService: ValidationService,
    private readonly usersService: UsersService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async register(@Body() createUserRequest: CreateUserRequest) {
    const validatedData = this.validationService.validate(
      UserValidator.REGISTER,
      createUserRequest,
    );

    const userExists = await this.usersService.checkUserExistence(
      validatedData.email,
    );

    if (userExists) {
      throw new HttpException(
        'Cannot register new user, user already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const userCreated = await this.usersService.create(validatedData);

    if (!userCreated) {
      throw new Error('Failed to create user');
    }

    return {
      status: 'success',
      message: 'User created successfully',
    };
  }
}
