import { REFRESH_TOKEN, SIGN_IN, SIGN_UP } from '@/shared/api/endpoints';
import { RefreshTokenRequest, SignInRequest, SignUpRequest, RefreshTokenResponse } from './typings';
import { clientDefault } from '../client';

export async function signIn(request: SignInRequest): Promise<any> {
  return clientDefault.post(SIGN_IN, request).then((response) => response.data);
}

export async function signUp(request: SignUpRequest): Promise<any> {
  return clientDefault.post(SIGN_UP, request).then((response) => response.data);
}

export async function refreshAccessToken(
  request: RefreshTokenRequest
): Promise<RefreshTokenResponse> {
  return clientDefault.post(REFRESH_TOKEN, request).then((response) => response.data);
}
