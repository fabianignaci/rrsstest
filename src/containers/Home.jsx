import React from "react";
import axios from "axios";

//Components
import Header from "../components/Header";
import PostList from "../components/PostList";
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

  handleSearchTag = tag => {
    tag = tag.toLowerCase();
    this.fetchData(tag);
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
    axios
      .get(`https://n161.tech/api/dummyapi/tag/${tag || "any"}/post`)
      .then(res => {
        this.setComponentState(false, null, res.data.data);
      })
      .catch(e => {
        this.setComponentState(false, e);
      });
  };

  render() {
    return (
      <>
        <Header handleSearchTag={this.handleSearchTag} />
        {this.state.loading && <Loader />}

        {!this.state.data.length && !this.state.loading && !this.state.error && (
          <Error
            styles='text-info'
            message='Tag not found: You can find by "any"(default),
        "picture",
        "text",
        "post",
        "interesting",
        "read",
        "something",
        "tag" and
        "common"'
          />
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
