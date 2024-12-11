import { useQuery } from '@tanstack/react-query';
import { projectsService } from '../../api/services/projects';

export const useProjects = (params?: { page?: number; featured?: boolean }) => {
  return useQuery({
    queryKey: ['projects', params],
    queryFn: () => projectsService.getAll(params),
  });
};

export const useProject = (id: number) => {
  return useQuery({
    queryKey: ['project', id],
    queryFn: () => projectsService.getById(id),
    enabled: !!id,
  });
};