import { Document } from 'mongoose';

export class Pokemon extends Document{
    name: string;
    type: string;
    image: string;
}
