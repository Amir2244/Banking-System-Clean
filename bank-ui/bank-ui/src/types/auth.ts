export interface RegisterDto {
  email: string;
  userName: string;
  password: string;
  ownerName: string;
  initialBalance: number;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  accountId: string;
  email: string;
  username: string;
}

export interface ValidationError {
  errorMessage: string;
  propertyName: string;
}
