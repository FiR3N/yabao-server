import sequelize from "../db.js";
import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

// export const Users = sequelize.define("users", {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   email: { type: DataTypes.STRING, allowNull: false, unique: true },
//   phone: { type: DataTypes.STRING, allowNull: false, unique: true },
//   name: { type: DataTypes.STRING, allowNull: false },
//   surname: { type: DataTypes.STRING, allowNull: false },
//   isConfirmed: {
//     type: DataTypes.BOOLEAN,
//     allowNull: false,
//     defaultValue: false,
//   },
// });

// export const Products = sequelize.define("products", {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   name: { type: DataTypes.STRING, allowNull: false },
//   img: { type: DataTypes.STRING, allowNull: false },
//   desc: { type: DataTypes.STRING, allowNull: false },
//   price: { type: DataTypes.DECIMAL, allowNull: false },
//   discountedPrice: { type: DataTypes.DECIMAL, allowNull: true },
//   isDiscount: { type: DataTypes.BOOLEAN, allowNull: false },
//   isAvailable: { type: DataTypes.BOOLEAN, allowNull: false },
// });

// export const Types = sequelize.define("types", {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   name: { type: DataTypes.STRING, allowNull: false },
// });

// export const Roles = sequelize.define("roles", {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   name: { type: DataTypes.STRING, allowNull: false },
// });

// export const BasketItems = sequelize.define("basketItems", {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   count: { type: DataTypes.INTEGER, allowNull: false },
// });

// export const Basket = sequelize.define("basket", {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
// });

// export const OrderTypes = sequelize.define("orderTypes", {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   name: { type: DataTypes.STRING, allowNull: false },
// });
// export const Orders = sequelize.define("orders", {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   totalPrice: { type: DataTypes.DECIMAL, allowNull: false },
// });

//export const News = sequelize.define("news", {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   name: { type: DataTypes.STRING, allowNull: false },
//   desc: { type: DataTypes.STRING, allowNull: false },
//   img: { type: DataTypes.STRING, allowNull: false },
// });

// export const Types_addition = sequelize.define("types_addition", {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   name: { type: DataTypes.STRING, allowNull: false },
//   addition_lvl: { type: DataTypes.STRING, allowNull: false },
//   price_coefficient: { type: DataTypes.DECIMAL, allowNull: false },
// });

// const Token = sequelize.define("tokens", {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//     allowNull: false,
//   },
//   refreshToken: { type: DataTypes.STRING, allowNull: false },
// });

class UserModel extends Model<
  InferAttributes<UserModel>,
  InferCreationAttributes<UserModel>
> {
  declare id: CreationOptional<number>;
  declare roleId: ForeignKey<RoleModel["id"]>;
  declare email: string;
  declare password: string;
  declare phone: string;
  declare name: string;
  declare surname: string;
  declare isConfirmed: boolean;
  declare activationLink: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

UserModel.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false, unique: true },
    name: { type: DataTypes.STRING, allowNull: false },
    surname: { type: DataTypes.STRING, allowNull: false },
    isConfirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    activationLink: { type: DataTypes.STRING, allowNull: true },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: sequelize,
    tableName: "users",
  }
);

class ProductModel extends Model<
  InferAttributes<ProductModel>,
  InferCreationAttributes<ProductModel>
> {
  declare id: CreationOptional<number>;
  declare typeId: ForeignKey<TypeModel["id"]>;
  declare name: string;
  declare img: string;
  declare desc: string;
  declare price: number;
  declare discountedPrice: number;
  declare isDiscount: boolean;
  declare isAvailable: boolean;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

ProductModel.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false },
    desc: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL, allowNull: false },
    discountedPrice: { type: DataTypes.DECIMAL, allowNull: true },
    isDiscount: { type: DataTypes.BOOLEAN, allowNull: false },
    isAvailable: { type: DataTypes.BOOLEAN, allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: sequelize,
    tableName: "products",
  }
);

class TypeModel extends Model<
  InferAttributes<TypeModel>,
  InferCreationAttributes<TypeModel>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  // declare nameEn: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

TypeModel.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    // nameEn: { type: DataTypes.STRING, allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: sequelize,
    tableName: "types",
  }
);

class TypeAdditionModel extends Model<
  InferAttributes<TypeAdditionModel>,
  InferCreationAttributes<TypeAdditionModel>
> {
  declare id: CreationOptional<number>;
  declare typeId: ForeignKey<TypeModel["id"]>;
  declare name: string;
  declare addition_lvl: string;
  declare price: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

TypeAdditionModel.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    addition_lvl: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL, allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: sequelize,
    tableName: "types-additions",
  }
);

class RoleModel extends Model<
  InferAttributes<RoleModel>,
  InferCreationAttributes<RoleModel>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

RoleModel.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: sequelize,
    tableName: "roles",
  }
);

class NewsModal extends Model<
  InferAttributes<NewsModal>,
  InferCreationAttributes<NewsModal>
> {
  declare id: CreationOptional<number>;
  declare userId: ForeignKey<UserModel["id"]>;
  declare name: string;
  declare desc: string;
  declare img: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

NewsModal.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    desc: { type: DataTypes.STRING, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: sequelize,
    tableName: "news",
  }
);

//

class BasketModel extends Model<
  InferAttributes<BasketModel>,
  InferCreationAttributes<BasketModel>
> {
  declare id: CreationOptional<number>;
  declare userId: ForeignKey<UserModel["id"]>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

BasketModel.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: sequelize,
    tableName: "baskets",
  }
);

class BasketItemModel extends Model<
  InferAttributes<BasketItemModel>,
  InferCreationAttributes<BasketItemModel>
> {
  declare id: CreationOptional<number>;
  declare orderId: ForeignKey<OrderModal["id"]> | null;
  declare basketId: ForeignKey<BasketModel["id"]>;
  declare productId: ForeignKey<ProductModel["id"]>;
  declare count: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

BasketItemModel.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    count: { type: DataTypes.INTEGER, allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: sequelize,
    tableName: "basket-items",
  }
);

class OrderTypeModel extends Model<
  InferAttributes<OrderTypeModel>,
  InferCreationAttributes<OrderTypeModel>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

OrderTypeModel.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: sequelize,
    tableName: "orders-types",
  }
);

class OrderModal extends Model<
  InferAttributes<OrderModal>,
  InferCreationAttributes<OrderModal>
> {
  declare id: CreationOptional<number>;
  declare totalPrice: number;
  declare basketId: ForeignKey<BasketModel["id"]>;
  declare orderTypeId: ForeignKey<OrderTypeModel["id"]>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

OrderModal.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    totalPrice: { type: DataTypes.DECIMAL, allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: sequelize,
    tableName: "orders",
  }
);

class TokenModel extends Model<
  InferAttributes<TokenModel>,
  InferCreationAttributes<TokenModel>
> {
  declare id: CreationOptional<number>;
  declare userId: ForeignKey<UserModel["id"]>;
  declare refreshToken: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

TokenModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    refreshToken: { type: DataTypes.STRING, allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: sequelize,
    tableName: "tokens",
  }
);

TypeModel.hasMany(ProductModel, {
  sourceKey: "id",
  foreignKey: "typeId",
  as: "products",
});
// ProductModel.belongsTo(TypeModel);

TypeModel.hasMany(TypeAdditionModel, {
  sourceKey: "id",
  foreignKey: "typeId",
  as: "types-additions",
});
// TypeAdditionModel.belongsTo(TypeModel);

RoleModel.hasMany(UserModel, {
  sourceKey: "id",
  foreignKey: "roleId",
  as: "users",
});
// UserModel.belongsTo(RoleModel);

UserModel.hasOne(NewsModal, {
  sourceKey: "id",
  foreignKey: "userId",
  as: "news",
});
// NewsModal.belongsTo(UserModel, { targetKey: "id" });

UserModel.hasOne(BasketModel, {
  sourceKey: "id",
  foreignKey: "userId",
  as: "baskets",
});
// BasketModel.belongsTo(UserModel, { targetKey: "id" });

BasketModel.hasMany(BasketItemModel, {
  sourceKey: "id",
  foreignKey: "basketId",
  as: "basket-items",
});
// BasketItemModel.belongsTo(BasketModel);

OrderModal.hasMany(BasketItemModel, {
  sourceKey: "id",
  foreignKey: "orderId",
  as: "basket-items",
});

ProductModel.hasMany(BasketItemModel, {
  sourceKey: "id",
  foreignKey: "productId",
  as: "basket-items",
});
// BasketItemModel.belongsTo(OrderModal);

BasketModel.hasMany(OrderModal, {
  sourceKey: "id",
  foreignKey: "basketId",
  as: "orders",
});
// OrderModal.belongsTo(BasketModel);

OrderTypeModel.hasMany(OrderModal, {
  sourceKey: "id",
  foreignKey: "orderTypeId",
  as: "orders-items",
});
// OrderModal.belongsTo(OrderTypeModel);

UserModel.hasOne(TokenModel, {
  sourceKey: "id",
  foreignKey: "userId",
  as: "tokens",
});
// TokenModel.belongsTo(UserModel, {
//   targetKey: "id",
// });

export {
  UserModel,
  ProductModel,
  BasketModel,
  BasketItemModel,
  TypeModel,
  TypeAdditionModel,
  RoleModel,
  OrderTypeModel,
  OrderModal,
  NewsModal,
  TokenModel,
};
