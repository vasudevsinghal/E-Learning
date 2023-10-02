import React from "react";
import axios from "axios";
import BACKEND_URL from "../../../url";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import { grey } from "@mui/material/colors";

const Likes = ({ totalLikes, noteId, userLiked }) => {
  const baseURL = `${BACKEND_URL}/api/note/${noteId}/like`;
  const [toggleLike, setToggleLike] = React.useState(userLiked);
  const [likeCount, setLikeCount] = React.useState(totalLikes);

  const like = () => {
    try {
      axios.patch(baseURL).then((response) => {
        if (response.status === 200) {
          var newLikeCount = likeCount + (!toggleLike ? 1 : -1);
          setToggleLike(!toggleLike);
          setLikeCount(newLikeCount);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {toggleLike ? (
        <ThumbUpRoundedIcon onClick={like} sx={{ color: grey[900] }} />
      ) : (
        <ThumbUpRoundedIcon
          onClick={like}
          sx={{ color: grey[50], stroke: "#000000", strokeWidth: 1 }}
        />
      )}
      <p>{likeCount} likes</p>
    </>
  );
};

export default Likes;
