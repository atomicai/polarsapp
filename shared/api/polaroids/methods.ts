import { GET_IMAGE, GET_POLAROIDS } from '@/shared/api/endpoints';
import {
  GetPolaroidsRequest,
  GetPolaroidsResponse,
  PolaroidResponse
} from '@/shared/types/polaroids';
import { clientWithAuth } from '../client';

export async function getPolaroids(request: GetPolaroidsRequest): Promise<PolaroidResponse[]> {
  return clientWithAuth.post(GET_POLAROIDS, request).then((response) => response.data);
}

export async function getImage(request: string): Promise<any> {
  const url = GET_IMAGE + '/' + request;
  return clientWithAuth.get(url).then((response) => response.data);
}
