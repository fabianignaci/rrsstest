import React from "react";
import axios from "axios";

import Post from "../components/Post";
import Loader from "../components/Loader";

class UserList extends React.Component {
  state = {
    loading: false,
    error: null,
    data: [],
    tag: this.props.tag
  };

  componentDidMount() {
    this.fetchData();
  }

  setComponentState(loading, error, data) {
    this.setState({
      loading,
      error: error || null,
      data: data || []
    });
  }

  fetchData = () => {
    this.setComponentState(true, null);

    setTimeout(() => {
      axios
        .get(`https://n161.tech/api/dummyapi/tag/${this.state.tag}/post`)
        .then(res => {
          this.setComponentState(false, null, res.data.data);
        })
        .catch(e => {
          this.setComponentState(false, e);
        });
    }, 1000);
  };

  render() {
    if (this.state.loading) {
      return (
        <div className='row'>
          <div className='col-12 loader-content'>
            <Loader />
          </div>
        </div>
      );
    }

    if (this.state.error) {
      return (
        <div className='container'>
          <div className='row'>
            <div className='col text-center mt-5'>
              <strong>
                <p className='text-danger'>{`Error: ${this.state.error.message}`}</p>
              </strong>
            </div>
          </div>
        </div>
      );
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
