import { api } from '../config';
import { ENDPOINTS } from '../endpoints';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;  
}

export const contactService = {
  submit: async (data: ContactFormData): Promise<ContactResponse> => {
    const response = await api.post<ContactResponse>(ENDPOINTS.CONTACT, data);
    return response.data;
  },
};