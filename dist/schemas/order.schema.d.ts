import { HydratedDocument, Types } from 'mongoose';
export type OrderDocument = HydratedDocument<Order>;
export declare class VariantItem {
    variantId: Types.ObjectId;
    quantity: number;
    price: number;
}
type VariantDocument = HydratedDocument<VariantItem>;
export declare const VariantSchema: import('mongoose').Schema<
    VariantItem,
    import('mongoose').Model<
        VariantItem,
        any,
        any,
        any,
        import('mongoose').Document<unknown, any, VariantItem> &
            VariantItem & {
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
    VariantItem,
    import('mongoose').Document<unknown, {}, import('mongoose').FlatRecord<VariantItem>> &
        import('mongoose').FlatRecord<VariantItem> & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }
>;
export declare class Order {
    date: Date;
    orderNumber: string;
    clientId: Types.ObjectId;
    variants: VariantDocument[];
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
