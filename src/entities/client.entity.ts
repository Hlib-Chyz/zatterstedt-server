import { IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class Client {
    @ObjectIdColumn()
    public _id: ObjectId;
    @Column()
    @IsNotEmpty()
    @IsString()
    public name: string;
    @Column()
    @IsNotEmpty()
    @IsString()
    public contacts: string;
}
