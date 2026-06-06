import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User)
        private userModel: typeof User,
    ) {}

    async createUser ( createUser : CreateUserDto): Promise <User>{
        const existingUser = await this.userModel.findOne ({
            where: { email: createUser.email }
        });

        if(existingUser) {
            throw new ConflictException ( 'Esta email ya esta registrado');
        }

        const hashedPassword = await bcrypt.hash(createUser.password,10);

        const newUser = await this.userModel.create ({
            email: createUser.email,
            password: hashedPassword,
        } as any);

        const { password, ...result} = newUser.toJSON();

        return result as User;
    }

    async findByEmail(email: string) : Promise <User | null>{
        return this.userModel.findOne( { where: {email} });
    }
}
