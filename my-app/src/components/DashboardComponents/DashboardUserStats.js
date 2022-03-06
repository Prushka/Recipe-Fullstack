import React from 'react';
import '../../styles/Dashboard.css';

class DashboardUserStats extends React.Component {
    render() {
        return (
            <div className="grid-item dashboard-user-stat-container" style={{textAlign: 'center', fontWeight: 'bold', fontSize: '25px'}}>
                <div className='dashboard-user-stat-title'>
                    User Statistics
                </div>
                <div className='dashboard-user-stat-1-3'>
                    <div>
                        <h3>1234</h3>
                        <p>Total Followers</p>
                    </div>
                    <div>
                        <h3>5</h3>
                        <p>Total Recipes</p>
                    </div>
                </div>
                <div className='dashboard-user-stat-2'>
                    <div>
                        <h3>32</h3>
                        <p>Total Likes</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default DashboardUserStats;