import { IsDateString, IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class DevelopmentCost {
    @ObjectIdColumn()
    public _id: ObjectId;
    @Column()
    @IsNotEmpty()
    @IsDateString()
    public date: string;
    @Column()
    @IsNotEmpty()
    @IsString()
    public description: string;
    @Column()
    @IsNotEmpty()
    @IsNumber()
    public cost: number;
    @Column()
    @IsNotEmpty()
    @IsMongoId()
    public productId: string;
}
