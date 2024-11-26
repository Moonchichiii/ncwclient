import { useQuery } from '@tanstack/react-query';
import { projectsService, ProjectsResponse } from '../api/services/projects';

export const useProjects = (params?: { page?: number; featured?: boolean }) => {
  const { data: projects, isLoading: loading, error } = useQuery<ProjectsResponse>({
    queryKey: ['projects', params],
    queryFn: () => projectsService.getAll(params),
  });

  return { projects, loading, error };
};

export default useProjects;