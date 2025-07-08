import { Document, Types } from 'mongoose';

export class Pokemon extends Document{
    name: string;
    type: string;
    image: string;
    city?: Types.ObjectId;
}
