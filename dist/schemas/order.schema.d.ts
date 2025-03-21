import { HydratedDocument, Types } from 'mongoose';
type VariantItemDocument = HydratedDocument<VariantItem>;
declare class VariantItem {
    _id: Types.ObjectId;
    quantity: number;
    price: number;
}
export type OrderDocument = HydratedDocument<Order>;
export declare class Order {
    date: Date;
    orderNumber: string;
    clientId: Types.ObjectId;
    variants: VariantItemDocument[];
}
export declare const OrderSchema: import('mongoose').Schema<
    Order,
    import('mongoose').Model<
        Order,
        any,
        any,
        any,
        import('mongoose').Document<unknown, any, Order> &
            Order & {
                _id: Types.ObjectId;
            } & {
                __v: number;
            },
        any
    >,
    {},
    {},
    {},
    {},
    import('mongoose').DefaultSchemaOptions,
    Order,
    import('mongoose').Document<unknown, {}, import('mongoose').FlatRecord<Order>> &
        import('mongoose').FlatRecord<Order> & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }
>;
export {};
