import React from "react";

import Post from "./Post";

const PostList = props => {
  return (
    <div className='row'>
      {props.data.map(post => (
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
};

export default PostList;
