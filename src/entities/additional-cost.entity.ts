import { IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';
import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class AdditionalCost {
    @ObjectIdColumn()
    public _id: ObjectId;
    @Column({ unique: true })
    @IsNotEmpty()
    @IsMongoId()
    public productId: string;
    @Column()
    @IsNotEmpty()
    @IsNumber()
    public cost: number;
}
