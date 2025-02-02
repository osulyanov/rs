import { Component } from 'react';

class SearchForm extends Component<{
  onSubmit: (e: React.FormEvent) => void;
  defaultValue: string;
}> {
  render() {
    return (
      <div className="input-group">
        <form onSubmit={this.props.onSubmit}>
          <input
            type="text"
            className="input-field"
            placeholder="[ENTER SPECIE]"
            defaultValue={this.props.defaultValue}
            id="specieName"
            name="specieName"
          />
          <button className="fetch-button">&gt; SEARCH</button>
        </form>
      </div>
    );
  }
}

export default SearchForm;
