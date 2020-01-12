import React from "react";
//import { Link } from "react-router-dom";
import Header from "../components/Header";
import PostList from "../containers/PostList";

//assets
import "../assets/styles/Home.css";

class Home extends React.Component {
  state = {
    tag: "post"
  };

  render() {
    return (
      <>
        <Header handleTag={this.handleTag} />
        <div className='container-fluid bg-custom-2 mt-5'>
          <div className='container bg-white'>
            <PostList tag={this.state.tag} />
          </div>
        </div>
      </>
    );
  }
}

export default Home;
