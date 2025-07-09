import { Document, Types } from 'mongoose';

export class User extends Document{
    username: string;
    name: string;
    email: string;
    password: string;
}
