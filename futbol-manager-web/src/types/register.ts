export interface RegisterRequest {
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  password: string;
  birthDate: string;
  gender: string;
  phoneNumber?: string;
}

export interface RegisterResponse {
  message: string;
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  };
}