import { Type } from 'class-transformer';
import { IsArray, IsMongoId, IsNotEmpty, ValidateNested } from 'class-validator';
import { ObjectId } from 'mongodb';
import { JobDto, InventoryDto } from 'src/dto/manufacturing-cost.dto';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class ManufacturingCost {
    @ObjectIdColumn()
    public _id: ObjectId;
    @Column({ unique: true })
    @IsNotEmpty()
    @IsMongoId()
    public productId: string;
    @Column()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => JobDto)
    public job: JobDto[] = [];
    @Column()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => InventoryDto)
    public inventory: InventoryDto[] = [];
}
