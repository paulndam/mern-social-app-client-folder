import axios from "axios";

const create = async (params, credentials, post) => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_API}/posts/new/${params.userId}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${credentials.t}`,
        },
        body: post,
      }
    );

    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const listByUser = async (params, credentials) => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_API}/posts/by/${params.userId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${credentials.t}`,
        },
      }
    );

    return await response.json();
  } catch (err) {
    console.log(
      "---error fetching list of for one user  api in the client side --"
    );
    console.log(err);
  }
};

const listNewsFeed = async (params, credentials, signal) => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_API}/posts/feed/${params.userId}`,
      {
        method: "GET",
        signal,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${credentials.t}`,
        },
      }
    );
    return await response.json();
  } catch (err) {
    console.log(
      "---error fetching list new feed from post api in the client side --"
    );
    console.log(err);
  }
};

const remove = async (params, credentials) => {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_API}/posts/${params.postId}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${credentials.t}`,
        },
      }
    );

    return await response.json();
  } catch (err) {
    console.log("---error removing post from post api in the client side --");
    console.log(err);
  }
};

const like = async (params, credentials, postId) => {
  try {
    let response = await fetch(`${process.env.REACT_APP_API}/posts/like`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.t}`,
      },
      body: JSON.stringify({ userId: params.userId, postId: postId }),
    });
    return await response.json();
  } catch (err) {
    console.log("---error liking post from post api in the client side --");
    console.log(err);
  }
};

const unlike = async (params, credentials, postId) => {
  try {
    let response = await fetch(`${process.env.REACT_APP_API}/posts/unlike`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorizaton: `Bearer ${credentials.t}`,
      },
      body: JSON.stringify({ userId: params.userId, postId: postId }),
    });
    return await response.json();
  } catch (err) {
    console.log("---error unliking post from post api in the client side --");
    console.log(err);
  }
};

const comment = async (params, credentials, postId, comment) => {
  try {
    let response = await fetch(`${process.env.REACT_APP_API}/posts/comment`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.t}`,
      },
      body: JSON.stringify({
        userId: params.userId,
        postId: postId,
        comment: comment,
      }),
    });

    return await response.json();
  } catch (err) {
    console.log("---error commenting post from post api in the client side --");
    console.log(err);
  }
};

const unComment = async (params, credentials, postId, comment) => {
  try {
    let response = await fetch(`${process.env.REACT_APP_API}/posts/uncomment`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.t}`,
      },
      body: JSON.stringify({
        userId: params.userId,
        postId: postId,
        comment: comment,
      }),
    });
    return await response.json();
  } catch (err) {
    console.log(
      "---error un-commenting post from post api in the client side --"
    );
    console.log(err);
  }
};

export {
  listNewsFeed,
  listByUser,
  create,
  remove,
  like,
  unlike,
  comment,
  unComment,
};
