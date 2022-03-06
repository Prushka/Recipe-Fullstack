import React from "react";
import {CgClose, CgChevronRight} from 'react-icons/cg';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import sushi from '../../images/sushi.jpg';
import {Link} from 'react-router-dom';

class Modal extends React.Component {

    onClose = e => {
        this.props.onClose && this.props.onClose(e);
    };

    render() {
        const foodCat = this.props.foodCat;

        if(!this.props.show){
            return null;
        }
        return (
            <div className='food-categories-modal-container'> 
                <div className='food-categories-modal'>
                    <div style={{justifyContent: 'space-between', display: 'flex', padding: '20px 20px 0px 20px'}}>
                        {this.props.children}
                        <button onClick={e => {this.onClose(e)}} className='no-style-button'>
                            <CgClose />
                        </button>
                    </div>
                    <div>
                        <ImageList sx={{width: '90%', height: '35vh', padding: '0px 5% 0px 5%'}} cols={4}>
                            {foodCat.map((cat) => {
                                return(
                                    <ImageListItem >
                                        <img src={sushi} alt='sushi'/>
                                        <ImageListItemBar title={cat} actionIcon={
                                            <button className='no-style-button'>
                                                <Link to='/browse'>
                                                    <IconButton sx={{ color: 'rgba(255, 255, 255, 0.54)' }}>
                                                        <CgChevronRight />
                                                    </IconButton>
                                                </Link>
                                            </button>
                                        }>
                                        </ImageListItemBar> 
                                    </ImageListItem>
                                )
                            })}
                        </ImageList>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;