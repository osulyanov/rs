import { CountriesTable } from './components/countries-table';
import { Header } from './components/header';
import { useCountries } from './hooks/use-countries';
import { useVisitedCountries } from './hooks/use-visited-countries';
import './app.css';
import { ErrorBoundary } from './components/error-boundary';
import { ErrorMessage } from './components/error-message';

export const App = () => {
  const { countries, loading, error, setFilters, setSort, filters, sort } =
    useCountries();

  const { visitedCountries, toggleCountry } = useVisitedCountries();

  return (
    <ErrorBoundary fallback={<ErrorMessage />}>
      <div className="container">
        <Header />
        <CountriesTable
          countries={countries}
          loading={loading}
          error={error}
          sort={sort}
          filters={filters}
          onSort={setSort}
          onFilter={setFilters}
          visitedCountries={visitedCountries}
          onToggleVisit={toggleCountry}
        />
      </div>
    </ErrorBoundary>
  );
};
