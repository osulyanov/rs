import React from 'react';
import { Country, SortConfig, FilterConfig } from '../../types/country';
import styles from './countries-table.module.css';
import { CountriesTableItem } from './countries-table-item';

interface CountriesTableProps {
  countries: Country[];
  loading: boolean;
  error: string | null;
  sort: SortConfig;
  filters: FilterConfig;
  onSort: (config: SortConfig) => void;
  onFilter: (config: FilterConfig) => void;
  visitedCountries: string[];
  onToggleVisit: (countryCode: string) => void;
}

export const CountriesTable: React.FC<CountriesTableProps> = ({
  countries,
  loading,
  error,
  sort,
  filters,
  onSort,
  onFilter,
  visitedCountries,
  onToggleVisit,
}) => {
  const handleSort = (field: 'name' | 'population') => {
    onSort({
      field,
      direction:
        sort.field === field && sort.direction === 'asc' ? 'desc' : 'asc',
    });
  };

  if (loading) {
    return <div className={styles.loading}>Loading countries...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Search by name..."
          value={filters.name || ''}
          onChange={(e) => onFilter({ ...filters, name: e.target.value })}
          className={styles.searchInput}
        />
        <select
          value={filters.region || ''}
          onChange={(e) => onFilter({ ...filters, region: e.target.value })}
          className={styles.regionSelect}
        >
          <option value="">All Regions</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Visited</th>
            <th>Flag</th>
            <th onClick={() => handleSort('name')} className={styles.sortable}>
              Name{' '}
              {sort.field === 'name' && (sort.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th>Region</th>
            <th
              onClick={() => handleSort('population')}
              className={styles.sortable}
            >
              Population{' '}
              {sort.field === 'population' &&
                (sort.direction === 'asc' ? '↑' : '↓')}
            </th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country) => (
            <CountriesTableItem
              key={country.code}
              country={country}
              visitedCountries={visitedCountries}
              onToggleVisit={onToggleVisit}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
