import React from "react";
//import { Link } from "react-router-dom";
import Header from "../components/Header";
import PostList from "../components/PostList";

//assets
import "../assets/styles/Home.css";

class Home extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className='container-fluid bg-custom-2 mt-5'>
          <div className='container bg-white'>
            <PostList />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
