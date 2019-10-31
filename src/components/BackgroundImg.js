import React from "react";

const BackgroundImg = ({ imageUrl, setImage }) => {
  return (
    <div className="backgroundImg">
      <img src={imageUrl} alt="images" onClick={setImage} />
    </div>
  );
};

export default BackgroundImg;
