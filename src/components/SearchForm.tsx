import { FormEvent } from 'react';

interface SearchFormProps {
  onSubmit: (e: FormEvent) => void;
  defaultValue: string;
}

function SearchForm({ onSubmit, defaultValue }: SearchFormProps) {
  return (
    <div className="input-group">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          className="input-field"
          placeholder="[ENTER SPECIE]"
          defaultValue={defaultValue}
          id="specieName"
          name="specieName"
        />
        <button className="fetch-button">&gt; SEARCH</button>
      </form>
    </div>
  );
}

export default SearchForm;
