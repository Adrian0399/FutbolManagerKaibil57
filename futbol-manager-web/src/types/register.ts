export interface RegisterRequest {
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  password: string;
  birthDate: string;
  gender: string;
  phoneNumber?: string;
  otpCode?: string;
}

export interface OtpResponse {
  message: string;
  otpCode?: string; // Solo en desarrollo
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