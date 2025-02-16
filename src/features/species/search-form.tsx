interface SearchFormProps {
  setSpecieName: (specieName: string) => void;
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
    <form onSubmit={onSubmit} className="input-group" data-testid="search-form">
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
