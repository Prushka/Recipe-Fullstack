import React from 'react'; 
import { Link } from 'react-router-dom';
import "../../src/styles/Browse.css";


class Result extends React.Component {
    state = {
      
    }
      
    render() {
      const {id, title, tags} = this.props;
      const improvedTags = tags;
      for (let i=0; i<improvedTags.length-1; i++){
        improvedTags[i] = improvedTags[i] + ', '
      }
      return (
        <div className='search'>
          <Link to={`/recipe/${id}`}><span className='linkFont'>{title}</span></Link>
          <h6>keywords: {improvedTags}</h6>
        </div>
      );  
    }
}

export default Result;