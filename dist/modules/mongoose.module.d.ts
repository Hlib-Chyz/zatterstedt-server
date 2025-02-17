import { AdditionalCost } from 'src/schemas/additional-cost.schema';
import { Client } from 'src/schemas/client.schema';
import { DevelopmentCost } from 'src/schemas/development-cost.schema';
import { FixedCost } from 'src/schemas/fixed-cost.schema';
import { Inventory } from 'src/schemas/inventory.schema';
import { Log } from 'src/schemas/log.schema';
import { ManufacturingCost } from 'src/schemas/manufacturing-cost.schema';
import { Order } from 'src/schemas/order.schema';
import { OtherCost } from 'src/schemas/other-cost.schema';
import { Product } from 'src/schemas/product.schema';
import { Stock } from 'src/schemas/stock.schema';
import { User } from 'src/schemas/user.schema';
import { Variant } from 'src/schemas/variant.schema';
export declare const schemas: ({
    name: string;
    schema: import("mongoose").Schema<Product, import("mongoose").Model<Product, any, any, any, import("mongoose").Document<unknown, any, Product> & Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Product, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Product>> & import("mongoose").FlatRecord<Product> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
} | {
    name: string;
    schema: import("mongoose").Schema<Client, import("mongoose").Model<Client, any, any, any, import("mongoose").Document<unknown, any, Client> & Client & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Client, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Client>> & import("mongoose").FlatRecord<Client> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
} | {
    name: string;
    schema: import("mongoose").Schema<DevelopmentCost, import("mongoose").Model<DevelopmentCost, any, any, any, import("mongoose").Document<unknown, any, DevelopmentCost> & DevelopmentCost & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, DevelopmentCost, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<DevelopmentCost>> & import("mongoose").FlatRecord<DevelopmentCost> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
} | {
    name: string;
    schema: import("mongoose").Schema<FixedCost, import("mongoose").Model<FixedCost, any, any, any, import("mongoose").Document<unknown, any, FixedCost> & FixedCost & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, FixedCost, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<FixedCost>> & import("mongoose").FlatRecord<FixedCost> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
} | {
    name: string;
    schema: import("mongoose").Schema<OtherCost, import("mongoose").Model<OtherCost, any, any, any, import("mongoose").Document<unknown, any, OtherCost> & OtherCost & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, OtherCost, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<OtherCost>> & import("mongoose").FlatRecord<OtherCost> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
} | {
    name: string;
    schema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, import("mongoose").Document<unknown, any, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
} | {
    name: string;
    schema: import("mongoose").Schema<AdditionalCost, import("mongoose").Model<AdditionalCost, any, any, any, import("mongoose").Document<unknown, any, AdditionalCost> & AdditionalCost & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AdditionalCost, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<AdditionalCost>> & import("mongoose").FlatRecord<AdditionalCost> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
} | {
    name: string;
    schema: import("mongoose").Schema<Inventory, import("mongoose").Model<Inventory, any, any, any, import("mongoose").Document<unknown, any, Inventory> & Inventory & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Inventory, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Inventory>> & import("mongoose").FlatRecord<Inventory> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
} | {
    name: string;
    schema: import("mongoose").Schema<Variant, import("mongoose").Model<Variant, any, any, any, import("mongoose").Document<unknown, any, Variant> & Variant & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Variant, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Variant>> & import("mongoose").FlatRecord<Variant> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
} | {
    name: string;
    schema: import("mongoose").Schema<ManufacturingCost, import("mongoose").Model<ManufacturingCost, any, any, any, import("mongoose").Document<unknown, any, ManufacturingCost> & ManufacturingCost & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ManufacturingCost, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ManufacturingCost>> & import("mongoose").FlatRecord<ManufacturingCost> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
} | {
    name: string;
    schema: import("mongoose").Schema<Stock, import("mongoose").Model<Stock, any, any, any, import("mongoose").Document<unknown, any, Stock> & Stock & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Stock, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Stock>> & import("mongoose").FlatRecord<Stock> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
} | {
    name: string;
    schema: import("mongoose").Schema<Order, import("mongoose").Model<Order, any, any, any, import("mongoose").Document<unknown, any, Order> & Order & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Order, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Order>> & import("mongoose").FlatRecord<Order> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
} | {
    name: string;
    schema: import("mongoose").Schema<Log, import("mongoose").Model<Log, any, any, any, import("mongoose").Document<unknown, any, Log> & Log & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Log, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Log>> & import("mongoose").FlatRecord<Log> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
})[];
export declare class ZatterstedtMongooseModule {
}
