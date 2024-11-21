import { IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';
import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class Stock {
    @ObjectIdColumn()
    public _id: ObjectId;
    @Column({ unique: true })
    @IsNotEmpty()
    @IsMongoId()
    public variantId: string;
    @Column({ default: 0 })
    @IsNotEmpty()
    @IsNumber()
    public sold: number;
    @Column()
    @IsNotEmpty()
    @IsNumber()
    public total: number;
    @Column()
    @IsNotEmpty()
    @IsNumber()
    public realizedParty: number;
}
