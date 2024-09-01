import { auth } from '@/shared/api/auth/index';
import {
  SignInRequest,
  SignUpRequest,
  RefreshTokenRequest,
  RefreshTokenResponse
} from '../api/auth/typings';

export async function signIn(request: SignInRequest): Promise<string> {
  try {
    const response = await auth.signIn(request);
    const jsonValue = JSON.stringify(response);
    return jsonValue;
  } catch (error) {
    throw error;
  }
}

export async function signUp(request: SignUpRequest): Promise<any> {
  try {
    return await auth.signUp(request);
  } catch (error) {
    throw error;
  }
}

export async function refreshAccessToken(
  request: RefreshTokenRequest
): Promise<RefreshTokenResponse> {
  try {
    return await auth.refreshAccessToken(request);
  } catch (error) {
    throw error;
  }
}
