import React from 'react'; 
import '../styles/Dashboard.css';
import DashboardRecommendedRecipe from './DashboardComponents/DashboardRecommendedRecipe';
import DashboardTopRecipes from './DashboardComponents/DashboardTopRecipes';
import DashboardUserStats from './DashboardComponents/DashboardUserStats';

class Dashboard extends React.Component {
    render(){ 
        return (
            <React.Fragment>
                <div className='dashboard-grid-container'>
                    <DashboardTopRecipes />
                    <DashboardUserStats />
                    <DashboardRecommendedRecipe />
                </div>
            </React.Fragment>
        );
    }
}

export default Dashboard;