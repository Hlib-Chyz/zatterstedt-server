import { IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class User {
    @ObjectIdColumn()
    public _id: ObjectId;
    @Column({ unique: true })
    @IsNotEmpty()
    @IsString()
    public email: string;
    @Column()
    @IsNotEmpty()
    @IsString()
    public password: string;
    @Column({ nullable: true })
    @IsString()
    public emailVerificationCode: string;
}
