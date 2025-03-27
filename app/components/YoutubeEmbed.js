"use client";
import React, { useState } from "react";
import PropTypes from "prop-types";

function YoutubeEmbed({ embedId, id, image }) {
  const [showVideo, setShowVideo] = useState(false);

  const onMouseEnterLoadYoutubeVideo = () => {
    setShowVideo(true);
  };

  return (
    <div
      className="video-responsive"
      onMouseEnter={onMouseEnterLoadYoutubeVideo}
    >
      {showVideo ? (
        <iframe
          id={id}
          width="100%"
          height="549"
          src={`https://www.youtube.com/embed/${embedId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      ) : (
        <div className="placeholder-image">
          <img
            src={image}
            alt="AMC Introduction Youtube Video"
            width="100%"
            height="265px"
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
}

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default YoutubeEmbed;
