import { api } from '../config';
import { ENDPOINTS } from '../endpoints';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export const contactService = {
  submit: async (data: ContactFormData) => {
    const response = await api.post(ENDPOINTS.CONTACT, data);
    return response.data;
  },
};