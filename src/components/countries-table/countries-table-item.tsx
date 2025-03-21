import { Country } from 'src/types/country';

import styles from './countries-table.module.css';

export const CountriesTableItem = ({
  country,
  visitedCountries,
  onToggleVisit,
}: {
  country: Country;
  visitedCountries: string[];
  onToggleVisit: (countryCode: string) => void;
}) => {
  return (
    <tr
      className={visitedCountries.includes(country.code) ? styles.visited : ''}
    >
      <td>
        <input
          type="checkbox"
          checked={visitedCountries.includes(country.code)}
          onChange={() => onToggleVisit(country.code)}
        />
      </td>
      <td>{country.flag}</td>
      <td>{country.name}</td>
      <td>{country.region}</td>
      <td>{country.population.toLocaleString()}</td>
    </tr>
  );
};
