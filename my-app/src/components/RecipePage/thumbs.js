import React from 'react'; 
import Button from "@material-ui/core/Button";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ReportIcon from '@material-ui/icons/Report';
import "../../styles/RecipeStyle.css"



class Thumbs extends React.Component {

  state = {
      upCount: 10,
      downCount: 2,
      upHited: false,
      downHited: false
  }

  handleUp = () => {
      if (this.state.upHited) {
        this.setState({
            upCount : this.state.upCount - 1
        })
      } else {
        this.setState({
            upCount : this.state.upCount + 1
        })
      }
      this.setState({
        upHited: !this.state.upHited
      })
  }

  handleDown = () => {
    if (this.state.downHited) {
      this.setState({
          downCount : this.state.downCount - 1
      })
    } else {
      this.setState({
          downCount : this.state.downCount + 1
      })
    }
    this.setState({
      downHited: !this.state.downHited
    })
}

  render() {

    return (
      <div className='thumbs'>
          <Button onClick={this.handleUp}><ThumbUpIcon/>{this.state.upCount}</Button>
          <Button onClick={this.handleDown}><ThumbDownIcon/>{this.state.downCount}</Button>
          <Button size='small'><ReportIcon/>Report</Button>
      </div>
    );  
  }
}
  
  export default Thumbs;