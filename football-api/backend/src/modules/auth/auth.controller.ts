import { Body, Controller, HttpCode, HttpStatus, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/dto/login-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginUserDto: LoginUserDto){
        const user = await this.authService.validateUser(loginUserDto.email, loginUserDto.password);

        if (!user) {
            throw new UnauthorizedException('Credenciales incorrectas');
        }

        return this.authService.login(user);
    }
}
