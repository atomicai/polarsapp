export interface SignInRequest {
  login: string;
  password: string;
}

export interface SignInResponse {
  id: uuid;
  email: string;
  image: string;
}

export interface SignUpRequest {
  login: string;
  password: string;
}

export interface SignUpResponse {
  id: uuid;
  email: string;
  image: string;
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
}
