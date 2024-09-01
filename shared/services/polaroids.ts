import { polaroids } from '@/shared/api/polaroids/index';
import {
  GetPolaroidsRequest,
  GetPolaroidsResponse,
  Polaroid,
  PolaroidResponse
} from '@/shared/types/polaroids';
import { AxiosError } from 'axios';
import { API_BASE_URL } from '../api';

export async function getPolaroids(request: GetPolaroidsRequest): Promise<PolaroidResponse[]> {
  try {
    const response = await polaroids.getPolaroids(request);
    return response.map((p) =>
      Object({ ...p, media_path: API_BASE_URL + 'media/' + p.media_path })
    );
  } catch (error) {
    throw error;
  }
}

export async function getImage(request: string): Promise<any> {
  try {
    const response = await polaroids.getImage(request);
    // const toDataURL = await new Promise((resolve, reject) => {
    //   const reader = new FileReader();
    //   reader.onloadend = () => resolve(reader.result);
    //   reader.onerror = reject;
    //   reader.readAsDataURL(new Blob(response));
    // });
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
}
