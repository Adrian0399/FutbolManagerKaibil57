import { DataTypes, Model } from "sequelize";
import type { Optional } from "sequelize";
import sequelize from "../config/database.js";

// Define Role attributes
interface RoleAttributes {
  id: number;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define optional attributes for creation
interface RoleCreationAttributes extends Optional<RoleAttributes, "id"> {}

// Extend Sequelize Model
class Role extends Model<RoleAttributes, RoleCreationAttributes> implements RoleAttributes {
  public id!: number;
  public name!: string;
  public description?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING(255),
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "updated_at",
    },
  },
  {
    sequelize,
    tableName: "roles",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Role;