import React from 'react'; 
import '../SavedRecipe/SavedRecipe.css';
import Sidebar from '../Sidebar.js';
import '../../styles/Sidebar.css';

class SavedRecipe extends React.Component {
    render(){
        return(
            <React.Fragment>
                <Sidebar />
            </React.Fragment>
        );
    }

}

export default SavedRecipe;