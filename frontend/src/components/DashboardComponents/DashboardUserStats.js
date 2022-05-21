import React from 'react';
import '../../styles/Dashboard.css';
import {RecipeAPI, UserAPI, ReviewAPI} from '../../axios/Axios';

class DashboardUserStats extends React.Component {
    state = {
        totalFollowers: 0,
        totalRecipes: 0,
        totalLikes: 0
    }

    componentDidMount() {
        // Fetch data from database on init
        RecipeAPI.get('/me').then(res => {
            const allRecipes = res.data
            this.setState({totalRecipes: allRecipes.length})

            for (let i = 0; i < allRecipes.length; i++) {
                ReviewAPI.get('/recipe/' + allRecipes[i]._id).then(res => {
                    for (let j = 0; j < res.data.length; j++) {
                        this.setState({totalLikes: this.state.totalLikes + res.data[j].rating})
                    }
                })
            }
        })
        UserAPI.get('/').then(res => {
            this.setState({totalFollowers: res.data.followers.length})
        })
    }

    render() {
        return (
            <div className="grid-item dashboard-user-stat-container" style={{textAlign: 'center', fontWeight: 'bold', fontSize: '25px'}}>
                <div className='dashboard-user-stat-title'>
                    User Statistics
                </div>
                <div className='dashboard-user-stat-1-3'>
                    <div>
                        <h3>{this.state.totalFollowers}</h3>
                        <p>Total Followers</p>
                    </div>
                    <div>
                        <h3>{this.state.totalRecipes}</h3>
                        <p>Total Recipes</p>
                    </div>
                </div>
                <div className='dashboard-user-stat-2'>
                    <div>
                        <h3>{this.state.totalLikes}</h3>
                        <p>Total Likes from Recipes</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default DashboardUserStats;