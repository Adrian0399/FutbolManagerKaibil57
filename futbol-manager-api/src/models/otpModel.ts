import { DataTypes, Model } from "sequelize";
import type { Optional } from "sequelize";
import sequelize from "../config/database.js";

interface OtpAttributes {
  id: number;
  email?: string;
  phoneNumber?: string;
  code: string;
  attempts: number;
  expiresAt: Date;
  isVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface OtpCreationAttributes extends Optional<OtpAttributes, "id"> {}

class Otp extends Model<OtpAttributes, OtpCreationAttributes> implements OtpAttributes {
  public id!: number;
  public email?: string;
  public phoneNumber?: string;
  public code!: string;
  public attempts!: number;
  public expiresAt!: Date;
  public isVerified!: boolean;
  public createdAt?: Date;
  public updatedAt?: Date;
}

Otp.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(100),
    },
    phoneNumber: {
      type: DataTypes.STRING(20),
      field: "phone_number",
    },
    code: {
      type: DataTypes.STRING(6),
      allowNull: false,
    },
    attempts: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "expires_at",
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: "is_verified",
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
    tableName: "otps",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Otp;