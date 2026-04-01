export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  birthDate?: string;
  gender?: string;
  roleId: number;
  role?: {
    id: number;
    name: string;
    description?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface UsersResponse {
  users: User[];
  newAccessToken?: string;
}
