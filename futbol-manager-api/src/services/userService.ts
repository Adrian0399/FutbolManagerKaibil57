import User from "../models/userModel.js";
import Role from "../models/roleModel.js";
import bcrypt from "bcrypt";

// Get all users
export const getAllUsers = async (): Promise<User[]> => {
  return await User.findAll({
    include: [{ model: Role, as: "role" }],
    attributes: {
      exclude: ["password"],
    },
  });
};

// Get user by ID
export const getUserById = async (id: number): Promise<User | null> => {
  return await User.findByPk(id, {
    include: [{ model: Role, as: "role" }],
    attributes: {
      exclude: ["password"],
    },
  });
};

// Create user
export const createUser = async (userData: any): Promise<User> => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  return await User.create({
    firstName: userData.firstName,
    lastName: userData.lastName,
    middleName: userData.middleName,
    email: userData.email,
    password: hashedPassword,
    birthDate: userData.birthDate,
    gender: userData.gender,
    phoneNumber: userData.phoneNumber,
    roleId: userData.roleId,
    createdBy: userData.createdBy,
  });
};

// Update user
export const updateUser = async (id: number, userData: any): Promise<User> => {
  const user = await User.findByPk(id);

  if (!user) {
    throw new Error("User not found");
  }

  if (userData.password) {
    userData.password = await bcrypt.hash(userData.password, 10);
  }

  return await user.update({
    firstName: userData.firstName || user.firstName,
    lastName: userData.lastName || user.lastName,
    middleName: userData.middleName || user.middleName,
    email: userData.email || user.email,
    password: userData.password || user.password,
    birthDate: userData.birthDate || user.birthDate,
    gender: userData.gender || user.gender,
    phoneNumber: userData.phoneNumber || user.phoneNumber,
    roleId: userData.roleId || user.roleId,
    updatedBy: userData.updatedBy,
  });
};

// Delete user
export const deleteUser = async (id: number): Promise<void> => {
  const user = await User.findByPk(id);

  if (!user) {
    throw new Error("User not found");
  }

  await user.destroy();
};

// Get user by email (for authentication)
export const getUserByEmail = async (email: string): Promise<User | null> => {
  return await User.findOne({
    where: { email },
    include: [{ model: Role, as: "role" }],
  });
};