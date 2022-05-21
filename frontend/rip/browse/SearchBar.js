import React from 'react'; 
import "../../src/styles/Browse.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SearchIcon from '@material-ui/icons/Search';

class SearchBar extends React.Component {
    state = {
      
    }
      
    render() {
      const {keywords, handleChange, name, search} = this.props;  
      return (
        <div className='search'>
            <TextField fullWidth name={name} variant='outlined' value={keywords} label='Enter Categories' onChange={handleChange} margin='normal' />
            <Button variant="contained" color='primary' onClick={search} className='searchButton' ><SearchIcon/>Search</Button>
        </div>
      );  
    }
}

export default SearchBar;