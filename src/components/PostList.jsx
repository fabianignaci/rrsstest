import React from "react";
import axios from "axios";

import Post from "../components/Post";
import Loader from "./Loader";

class UserList extends React.Component {
  state = {
    loading: false,
    error: null,
    data: []
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    this.setState({
      loading: true,
      error: null
    });

    setTimeout(() => {
      axios
        .get("https://n161.tech/api/dummyapi/post")
        .then(res => {
          console.log(res.data.data);
          this.setState({
            loading: false,
            error: null,
            data: res.data.data
          });
        })
        .catch(e => {
          this.setState({
            loading: false,
            error: e
          });
        });
    }, 100);
  };

  render() {
    if (this.state.loading) {
      return (
        <div className='row d-flex '>
          <div className='col-12 loader-content'>
            <Loader />
          </div>
        </div>
      );
    }

    if (this.state.error) {
      return `Error:${this.state.error.message}`;
    }

    return (
      <div className='row'>
        {this.state.data.map(post => (
          <Post
            id={post.id}
            key={post.id}
            image={post.image}
            message={post.message}
            ownerFirstName={post.owner.firstName}
            ownerLastName={post.owner.lastName}
            ownerImage={post.owner.image}
            tags={post.tags}
          />
        ))}
      </div>
    );
  }
}

export default UserList;
