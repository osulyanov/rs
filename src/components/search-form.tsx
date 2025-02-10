import { Dispatch, SetStateAction } from 'react';

interface SearchFormProps {
  setSpecieName: Dispatch<SetStateAction<string>>;
  defaultValue: string;
}

function SearchForm({ setSpecieName, defaultValue }: SearchFormProps) {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const specieName = formData.get('specieName') as string;
    setSpecieName(specieName);
  };

  return (
    <form onSubmit={onSubmit} className="input-group">
      <input
        type="text"
        className="input-field"
        placeholder="[ENTER SPECIE]"
        defaultValue={defaultValue}
        name="specieName"
      />
      <button className="fetch-button">&gt; SEARCH</button>
    </form>
  );
}

export default SearchForm;
