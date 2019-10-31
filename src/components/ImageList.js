import React from "react";
import BackgroundImg from "./BackgroundImg";

const ImageList = ({ imageList, setImage }) => {
  return (
    <div className="imageList">
      {imageList.map(imageUrl => (
        <BackgroundImg key={imageUrl} imageUrl={imageUrl} setImage={setImage} />
      ))}
    </div>
  );
};

export default ImageList;
