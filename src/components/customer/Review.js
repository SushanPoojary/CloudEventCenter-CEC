/* eslint-disable */
import React from "react";
import ReactStars from "react-rating-stars-component";
import NavBar from '../../NavBar';
import { URL } from '../../env';
import '../../styles/Review.css';
import Axios from 'axios';

export default class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      review: "",
      rating: 0
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const logdata = {
        description: this.state.review,
        rating: this.state.rating,
        event: 2,
        reviewedUser: 'sushanpoojary@gmail.com',
        reviewedBy: 'pj33@gmail.com',
    };

    console.log(logdata);
      const regf = JSON.stringify(logdata);
      
      var config = {
        method: 'post',
        url: `${URL}/user/review`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : regf
      };
      
      Axios(config)
      .then( (response) => {
        console.log(JSON.stringify(response));
        if(response.status === 200){
          
          this.setState({
            redirect: true
          });
        }
      })
      .catch(function (error) {
        alert(error);
        console.log(error);
      });
  }

  onRatingChanged = (rating) => {
    this.setState(() => ({ rating }));
  };

  onReviewChanged = (e) => {
    const review = e.target.value;
    this.setState(() => ({ review }));
  };

  componentDidUpdate = () => {
    console.log(this.state.rating + " " + this.state.review);
  };
  render() {
    return (
        <div>
            <NavBar />
      <div className="content-container">
        <div className="input-group">
            <h4>Review Organizer</h4>
          <form className="form">
            <div className="input-group__item">
              <textarea
                placeholder="Add a review"
                className="textarea"
                onChange={this.onReviewChanged}
              ></textarea>
            </div>
            <div className="input-group__item">
              <ReactStars
                count={5}
                onChange={this.onRatingChanged}
                size={24}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
                value={this.state.value}
              />
            </div>
            <div>
              {/* <button className="button">Submit</button> */}
              <input type="button" value="Submit" style={{ width: '190px', height: '35px', backgroundColor: '#33DFFF' }} onClick={this.handleSubmit} />
            </div>
          </form>
        </div>
      </div>
      </div>
    );
  }
}