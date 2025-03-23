export interface Country {
  name: string;
  code: string;
  population: number;
  region: string;
  flag: string;
}

export type SortField = 'name' | 'population';
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

export interface FilterConfig {
  name?: string;
  region?: string;
}
