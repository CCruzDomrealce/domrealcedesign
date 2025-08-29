import { useQuery } from "@tanstack/react-query";
import type { PageConfig } from "@shared/schema";

interface PageConfigsResponse {
  configs: PageConfig[];
}

export function usePageConfig(page: string) {
  const { data, isLoading, error } = useQuery<PageConfigsResponse>({
    queryKey: ['/api/admin/pages', page],
    enabled: !!page,
  });

  // Helper function to get a specific config value
  const getConfig = (section: string, element: string, defaultValue?: string) => {
    if (!data?.configs) return defaultValue || '';
    
    const config = data.configs.find(
      c => c.section === section && c.element === element
    );
    
    return config?.value || config?.defaultValue || defaultValue || '';
  };

  // Helper function to get all configs for a section
  const getSectionConfigs = (section: string) => {
    if (!data?.configs) return [];
    
    return data.configs.filter(c => c.section === section);
  };

  // Helper function to check if a config exists
  const hasConfig = (section: string, element: string) => {
    if (!data?.configs) return false;
    
    return data.configs.some(
      c => c.section === section && c.element === element
    );
  };

  return {
    configs: data?.configs || [],
    isLoading,
    error,
    getConfig,
    getSectionConfigs,
    hasConfig,
  };
}