import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class Product {
    @ObjectIdColumn()
    public _id: ObjectId;
    @Column({ unique: true })
    @IsNotEmpty()
    @IsString()
    public name: string;
    @Column()
    @IsNotEmpty()
    @IsNumber()
    public price: number;
    @Column()
    @IsNotEmpty()
    @IsString()
    public description: string;
}
