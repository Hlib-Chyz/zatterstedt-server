import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class OtherCost {
    @ObjectIdColumn()
    public _id: ObjectId;
    @Column()
    @IsNotEmpty()
    @IsDateString()
    public date: string;
    @Column()
    @IsNotEmpty()
    @IsString()
    public name: string;
    @Column()
    @IsNotEmpty()
    @IsNumber()
    public cost: number;
}
