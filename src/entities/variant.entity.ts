import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class Variant {
    @ObjectIdColumn()
    public _id: ObjectId;
    @Column()
    @IsNotEmpty()
    @IsString()
    public color: string;
    @Column()
    @IsNotEmpty()
    @IsString()
    public size: string;
    @Column()
    @IsNotEmpty()
    @IsMongoId()
    public productId: string;
}
