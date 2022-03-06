import React from 'react'; 
import '../../styles/Home.css';
import sushi from '../../images/sushi.jpg';
import Modal from './HomeModal';
import {Link} from 'react-router-dom';

class HomeFoodCategories extends React.Component {

    state = {
        showAllCategories: false
    }

    getFoodCategories() {
        // Hardcoded data that will be fetched from database
        return(
            ['Japanese', 'Chinese', 'French', 'Italian', 'Vietnamese', 'Mexican', 'Indian', 'Pastry', 'Drinks', 'Korean']
        );
    }

    showAllCategoriesModal = (e) => {
        this.setState({
            showAllCategories: !this.state.showAllCategories
        });
    }

    render() {
        const foodCategories = this.getFoodCategories();

        return(
            <React.Fragment>
                <div class="grid-item home-explore-categories-item">
                    <div className='grid-food-category-title'>
                        Explore these categories  
                    </div>
                    <button className='see-all-button' onClick={e => {this.showAllCategoriesModal()}}>See All</button>
                    {foodCategories.slice(0, 6).map((category) => {
                        return(
                            <CategoryItem categoryName={category} />
                        );
                    })}
                    <Modal onClose={this.showAllCategoriesModal} show={this.state.showAllCategories} foodCat={foodCategories}>All Categories</Modal>
                </div> 
            </React.Fragment>
        )
    }
}

class CategoryItem extends React.Component {

    render() {
        return(
            <Link to='/browse'>
                <button className="food-category-grid-item-button">
                    <img src={sushi} alt='categoryImage' />
                    {this.props.categoryName}
                </button>
            </Link>
        )
    }
}

export default HomeFoodCategories;