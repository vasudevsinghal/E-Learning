import React from "react";

const YoutubeEmbed = ({ embedId }) => (
  <iframe
    style={{
      width: "100%",
      aspectRatio: window.innerWidth > 992 ? "16/8" : "16/9",
      padding:
        window.innerWidth > 575 ? "1rem 1rem 0.75rem 1rem" : "0% 0% 1rem 0%",
    }}
    src={`https://www.youtube.com/embed/${embedId}`}
    title="YouTube video player"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
);

export default YoutubeEmbed;
