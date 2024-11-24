import { api } from '../config';
import { ENDPOINTS } from '../endpoints';

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string;
  link?: string;
  featured: boolean;
  created_at: string;
}

export interface ProjectsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Project[];
}

export const projectsService = {
  getAll: async (params?: { page?: number; featured?: boolean }) => {
    const response = await api.get<ProjectsResponse>(ENDPOINTS.PROJECTS, { params });
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get<Project>(`${ENDPOINTS.PROJECTS}${id}/`);
    return response.data;
  },
};