import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService, 
        private jwtService: JwtService,
    ){}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);

        if(user){
            const isPasswordValid = await bcrypt.compare(pass, user.password);

            if (isPasswordValid) {
                const {password, ...result} = user;
                return result;
            }
        }
        return null;
    }

    async login(user: any){
        const payload = { email: user.email, sub: user.id };
        const access_token = this.jwtService.sign(payload);
        return{
            access_token
        };
    }
}
