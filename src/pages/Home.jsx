import React from "react";
import axios from "axios";
//import { Link } from "react-router-dom";
import Header from "../components/Header";
import PostList from "../containers/PostList";
import Loader from "../components/Loader";
import Error from "../components/Error";
//assets
import "../assets/styles/Home.css";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      data: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  handleSearchTag = e => {
    this.fetchData(e.toLowerCase());
  };

  setComponentState(loading, error, data) {
    this.setState({
      loading,
      error: error || null,
      data: data || []
    });
  }

  fetchData = tag => {
    this.setComponentState(true, null);

    setTimeout(() => {
      axios
        .get(`https://n161.tech/api/dummyapi/tag/${tag || "common"}/post`)
        .then(res => {
          this.setComponentState(false, null, res.data.data);
        })
        .catch(e => {
          this.setComponentState(false, e);
        });
    }, 500);
  };

  render() {
    return (
      <>
        <Header handleSearchTag={this.handleSearchTag} />
        {this.state.loading && <Loader />}
        {!this.state.data.length &&
          !this.state.loading &&
          !this.state.error && (
            <Error styles='text-info h5' message='Tag not found' />
          )}
        {this.state.error && (
          <Error
            styles='text-danger h5'
            message='An error occurred on loading the feed'
          />
        )}
        <div className='container-fluid bg-custom-2 mt-5'>
          <div className='container bg-white'>
            <PostList data={this.state.data} />
          </div>
        </div>
      </>
    );
  }
}

export default Home;
