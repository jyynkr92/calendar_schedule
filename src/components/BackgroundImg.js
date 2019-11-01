import React from "react";

const BackgroundImg = ({ imageUrl, setImage, imageId }) => {
  return (
    <div className="backgroundImg">
      <img id={imageId} src={imageUrl} alt="images" onClick={setImage} />
    </div>
  );
};

export default BackgroundImg;
