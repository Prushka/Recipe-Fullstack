import React from 'react'; 
import Sidebar from './Sidebar.js'
import '../styles/Home.css';
import HomeFoodCategories from './HomeComponents/HomeFoodCategories';
import HomeRecommendRecipe from './HomeComponents/HomeRecommendRecipe';
import HomeSavedRecipe from './HomeComponents/HomeSavedRecipe';
import {Link} from 'react-router-dom';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        };
    }

    render(){ 
        if (this.state.isLoggedIn) {
            return (
                <React.Fragment>
                    <Sidebar />
                    <div className='home-grid-container'>
                        <HomeSavedRecipe />
                        <div class="grid-item home-user-stat-item" style={{textAlign: 'center', fontWeight: 'bold', fontSize: '25px'}}><p>User Stats</p></div>
                        <HomeFoodCategories /> 
                        <HomeRecommendRecipe />
                    </div>
                </React.Fragment>
            );
        } else {
            return(
                <React.Fragment>
                    <Sidebar /> 
                    <div className='home-grid-container'>
                        <div className='log-in-alert'>
                            <h1>Please Log In or Sign Up First</h1>
                            <Link to={'/login'}><button>Login</button></Link>
                            <Link to={'/signup'}><button>Sign Up</button></Link>
                        </div>
                    </div>
                </React.Fragment>
            )
        }
    }
}

export default Home;