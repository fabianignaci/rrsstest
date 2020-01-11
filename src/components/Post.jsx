import React from "react";
// import { Link } from "react-router-dom";
import "../assets/styles/Post.css";

import likeIcon from "../assets/static/like-icon.png";
//import likeIcon2 from "../assets/static/like-icon2.png";
import commentIcon from "../assets/static/comment-icon.png";
import shareIcon from "../assets/static/share-icon.png";

const Post = props => {
  const post = props;

  return (
    <div className='col-12 col-md-8 offset-md-2 my-3'>
      <div className='card'>
        <div className='d-flex align-items-center'>
          <img className='my-3 mx-2 img-post' src={post.ownerImage} alt='' />
          <p className='my-auto'>
            {post.ownerFirstName} {post.ownerLastName}
          </p>
        </div>
        <div className='card-img-content'>
          <img src={post.image} className='card-img-top' alt='...' />
        </div>
        <div className='card-body'>
          <div className='mb-4'>
            <img className='action-icon mx-2' src={likeIcon} alt='' />
            <img className='action-icon mx-2' src={commentIcon} alt='' />
            <img className='action-icon mx-2' src={shareIcon} alt='' />
          </div>
          <div>
            <p className='card-text'>{post.message}</p>
          </div>
          <div className='d-flex justify-content-start mt-4'>
            {post.tags.map(tag => (
              <span key={tag} className='badge badge-success mr-1'>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
