import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class Inventory {
    @ObjectIdColumn()
    public _id: ObjectId;
    @Column({ unique: true })
    @IsNotEmpty()
    @IsString()
    public name: string;
    @Column()
    @IsNotEmpty()
    @IsNumber()
    public totalCost: number;
    @Column()
    @IsNotEmpty()
    @IsNumber()
    public amount: number;
    @Column()
    @IsNotEmpty()
    @IsNumber()
    public used: number;
    @Column()
    @IsNotEmpty()
    @IsNumber()
    public paid: number;
    @Column()
    @IsNotEmpty()
    @IsDateString()
    public date: string;
}
