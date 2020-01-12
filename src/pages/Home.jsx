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
  state = {
    loading: false,
    error: null,
    data: [],
    tag: "post"
  };

  componentDidMount() {
    this.fetchData(this.state.tag);
  }

  handleSearchTag = e => {
    this.fetchData(e);
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
        .get(`https://n161.tech/api/dummyapi/tag/${tag}/post`)
        .then(res => {
          this.setComponentState(false, null, res.data.data);
        })
        .catch(e => {
          this.setComponentState(false, e);
        });
    }, 1000);
  };

  render() {
    // if (this.state.loading) {
    //   return <Loader />;
    // }

    // if (this.state.error) {
    //   return <Error message={this.state.error.message} />;
    // }
    return (
      <>
        <Header handleSearchTag={this.handleSearchTag} />
        {this.state.loading && <Loader />}
        {this.state.error && <Error message={this.state.error.message} />}
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
