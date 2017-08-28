import React, {Component} from 'react'

class SearchBar extends Component {

  constructor(props){
    super(props);
    this.state = {term: ""};
  }

  componentDidUpdate(){
    if(this.state.term === null){
      this.setState({
        term: ""
      });
    }
  }

  render(){
    return (
      <div>
        <input
          value={this.state.term}
          onChange={(event) => this.onInputChange(event.target.value)} />
      </div>
    );
  }

  onInputChange(term){
    this.setState ({
      term: term});
    this.props.onSearchTermChange(term);
  }

}

export default SearchBar;
