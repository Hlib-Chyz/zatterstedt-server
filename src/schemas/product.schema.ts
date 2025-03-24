import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { log } from 'src/helpers/log.helper';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
    @Prop({ type: String, required: true, unique: true }) public name: string;
    @Prop({ type: Number, required: true }) public price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

log(ProductSchema, Product.name);
