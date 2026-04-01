import { DataTypes, Model } from "sequelize";
import type { Optional } from "sequelize";
import sequelize from "../config/database.js";
import Role from "./roleModel.js";

// Define User attributes
interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  password: string;
  birthDate: Date;
  gender: string;
  phoneNumber?: string;
  roleId: number;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define optional attributes for creation
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

// Extend Sequelize Model
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public middleName?: string;
  public email!: string;
  public phoneNumber?: string;
  public password!: string;
  public birthDate!: Date;
  public gender!: string;
  public roleId!: number;
  public createdBy?: string;
  public updatedBy?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "first_name",
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "last_name",
    },
    middleName: {
      type: DataTypes.STRING(100),
      field: "middle_name",
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    phoneNumber: {
      type: DataTypes.STRING(20),
      field: "phone_number",
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "birth_date",
    },
    gender: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Role,
        key: "id",
      },
      field: "role_id",
    },
    createdBy: {
      type: DataTypes.STRING(100),
      field: "created_by",
    },
    updatedBy: {
      type: DataTypes.STRING(100),
      field: "updated_by",
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
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

User.belongsTo(Role, { foreignKey: "roleId", as: "role" });
Role.hasMany(User, { foreignKey: "roleId" });

export default User;