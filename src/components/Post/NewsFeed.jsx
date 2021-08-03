import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import auth from "../../utils/Auth/authHelper";
import { listNewsFeed } from "../../api/PostApi/postApi";
import NewPost from "./NewPost";
import PostList from "./PostList";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "auto",
    paddingTop: 0,
    paddingBottom: theme.spacing(3),
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
      2
    )}px`,
    color: theme.palette.openTitle,
    fontSize: "1em",
  },
  media: {
    minHeight: 330,
  },
}));

const NewsFeed = () => {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const jwt = auth.isAuthenticated();

  //upon when the components mount, we will use the useEffect hook that will initially load the state of the post that rendered in the PostList componet , we also achieve this by calling the fetch api method we implemented .listNewsFeed
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listNewsFeed({ userId: jwt.user._id }, { t: jwt.token }, signal).then(
      (data) => {
        console.log(
          "--- data from loading posts from useEffect in News Feed component",
          data
        );
        if (data.error) {
          console.log(data.error);
        } else {
          setPosts(data);
        }
      }
    );
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  // take the new post created in the NewPost component and add it to the posts in the state.

  const addPost = (post) => {
    const updatedPosts = [...posts];
    updatedPosts.unshift(post);
    setPosts(updatedPosts);
  };
  //take the deleted post from the Post component in PostList, and remove it from the posts in the state.
  const removePost = (post) => {
    const updatedPosts = [...posts];
    const index = updatedPosts.indexOf(post);
    updatedPosts.splice(index, 1);
    setPosts(updatedPosts);
  };

  return (
    <div>
      <Card className={classes.card}>
        <Typography type="title" className={classes.title}>
          Newsfeed
        </Typography>
        <Divider />
        <NewPost addUpdate={addPost} />
        <Divider />
        <PostList removeUpdate={removePost} posts={posts} />
      </Card>
    </div>
  );
};

export default NewsFeed;
