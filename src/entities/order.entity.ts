import { Type } from 'class-transformer';
import { IsArray, IsDateString, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { ObjectId } from 'mongodb';
import { VariantOrderDto } from 'src/dto/order.dto';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class Order {
    @ObjectIdColumn()
    public _id: ObjectId;
    @Column()
    @IsNotEmpty()
    @IsDateString()
    public date: string;
    @Column()
    @IsNotEmpty()
    @IsString()
    public clientId: string;
    @Column()
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => VariantOrderDto)
    public variants: VariantOrderDto[];
}
