import SpeciesList from './SpeciesList.tsx';
import { Component } from 'react';
import fetchSpeciesList, { SpeciesResult } from '../utils/fetchSpeciesList.tsx';
import SearchForm from './SearchForm.tsx';

interface SpeciesLookupState {
  specieName: string;
  speciesList: null | SpeciesResult[];
  loadingState: string;
}

class SpeciesLookup extends Component<object, SpeciesLookupState> {
  constructor(props: Readonly<object>) {
    super(props);
    const savedSpecieName = localStorage.getItem('specieName') || '';
    this.state = {
      specieName: savedSpecieName,
      speciesList: null,
      loadingState: 'idle',
    };
  }

  componentDidMount() {
    if (this.state.specieName) {
      this.triggerSearch(this.state.specieName);
    }
  }

  setSpecieName = (specieName: string) => {
    this.setState({ specieName });
    localStorage.setItem('specieName', specieName);
    this.triggerSearch(specieName);
  };

  triggerSearch = (specieName: string) => {
    this.setState({ speciesList: null, loadingState: 'loading' });
    fetchSpeciesList(specieName)
      .then((speciesList) => {
        this.setState({ speciesList, loadingState: 'idle' });
      })
      .catch(() => {
        console.error(`Error fetching species`);
        this.setState({ speciesList: null, loadingState: 'error' });
      });
  };

  render() {
    return (
      <>
        <SearchForm
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            this.setSpecieName(formData.get('specieName') as string);
          }}
          defaultValue={this.state.specieName}
        />
        <SpeciesList
          speciesList={this.state.speciesList}
          loadingState={this.state.loadingState}
        />
      </>
    );
  }
}

export default SpeciesLookup;
