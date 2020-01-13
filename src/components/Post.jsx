import React from "react";

//Assets
import "../assets/styles/Post.css";
import likeIcon from "../assets/static/like-icon.png";
import likeIconRed from "../assets/static/like-icon2.png";
import commentIcon from "../assets/static/comment-icon.png";
import okCommentIcon from "../assets/static/ok-comment-icon.png";
import shareIcon from "../assets/static/share-icon.png";
import facebookIcon from "../assets/static/facebook-icon.png";

const Post = props => {
  const [visibleInputComment, setVisibleInputComment] = React.useState(false);
  const [showLikeIcon, setShowLikeIcon] = React.useState(false);
  const [postedComment, setPostedComment] = React.useState(false);

  const {
    id,
    image,
    message,
    ownerFirstName,
    ownerLastName,
    ownerImage,
    tags
  } = props;

  const toggleLikeIcon = () => {
    if (showLikeIcon) {
      return <img className='action-icon mx-2' src={likeIconRed} alt='' />;
    } else {
      return <img className='action-icon mx-2' src={likeIcon} alt='' />;
    }
  };

  const toggleOkCommentIcon = () => {
    if (postedComment) {
      return <img className='action-icon mx-2' src={okCommentIcon} alt='' />;
    } else {
      return <img className='action-icon mx-2' src={commentIcon} alt='' />;
    }
  };

  const postComment = e => {
    if (e.key === "Enter" && e.target.value !== "") {
      e.target.value = "";
      setVisibleInputComment(false);
      setPostedComment(true);
    }
  };

  return (
    <div className='col-12 col-md-8 offset-md-2 my-3 animated fadeIn slow'>
      <div className='card'>
        <div className='d-flex align-items-center'>
          <img className='my-3 mx-2 img-post' src={ownerImage} alt='' />
          <p className='my-auto'>
            {ownerFirstName} {ownerLastName}
          </p>
        </div>
        <div className='card-img-content'>
          <img src={image} className='card-img-top' alt='...' />
        </div>
        <div className='card-body'>
          <div className='mb-4'>
            <button
              type='button'
              className='p-0 btn-cleansed'
              onClick={() => {
                setShowLikeIcon(!showLikeIcon);
              }}
            >
              {toggleLikeIcon()}
            </button>
            <button
              type='button'
              className='p-0 btn-cleansed'
              onClick={() => {
                setVisibleInputComment(!visibleInputComment);

                if (!visibleInputComment) {
                  setTimeout(() => {
                    document.getElementById(id).focus();
                  }, 0);
                }
              }}
            >
              {toggleOkCommentIcon()}
            </button>
            <button
              type='button'
              className='p-0 btn-cleansed'
              id='dropdownMenuButton'
              data-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='false'
            >
              <img className='action-icon mx-2' src={shareIcon} alt='' />
            </button>
            <div className='dropdown-menu'>
              <button className='dropdown-item btn-cleansed'>
                <img className='ml-auto' src={facebookIcon} alt='' />
              </button>
            </div>
          </div>
          <div>
            <p className='card-text'>{message}</p>
          </div>
          <div className='d-flex justify-content-start mt-4'>
            {tags.map(tag => (
              <span key={tag} className='badge badge-info mr-1'>
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className='mx-4 my-3'>
          {visibleInputComment && (
            <div>
              <input
                id={id}
                className='inputComment col-12'
                placeholder='Add comment...'
                type='text'
                onKeyPress={postComment}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
