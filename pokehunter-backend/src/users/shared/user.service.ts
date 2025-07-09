import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { User } from './user';
import { CreateUserDto } from '../dto/user.dto';

@Injectable()
export class UserService {
    
    constructor(
        @InjectModel('User') private readonly userModel: Model <User>,
        private readonly httpService: HttpService,
) {};
    
    // vai até o banco de dados e busca todas as cidades
    async getAll() {
        return await this.userModel.find().exec();
    }

    async getById(id: string) {
        const user = await this.userModel.findById(id).exec();
        if (! user) {
            throw new NotFoundException(`Não foi possível encontrar o usuário com id ${id}`)
        }
        return user;
    }
    async getByEmail(email: string) {
        const user = await this.userModel.findOne({email}).exec();
        if (! user) {
            throw new NotFoundException(`Não foi possível encontrar o usuário com email ${email}`)
        }
        return user;
    }
    
    async create(userDto: CreateUserDto) {
        console.log('Dados recebidos no DTO:', userDto);
        const createdUser = new this.userModel(userDto);
        return await createdUser.save();
    }


    async update(id: string, user: User) {
        await this.getById(id);
        const updatedUser = await this.userModel.findByIdAndUpdate({_id: id}, user).exec();
        if (! updatedUser) {
            throw new NotFoundException(`Não foi possível fazer o update do usuário com id ${id}`)
        }
        return updatedUser;
    }

    async delete(id: string) {
        return await this.userModel.deleteOne({_id:id}).exec()
    }
    
}