import React from "react";
import BackgroundImg from "./BackgroundImg";

const ImageList = ({ imageList, setImage }) => {
  return (
    <div className="imageList">
      {imageList.map(imageObj => (
        <BackgroundImg
          key={imageObj.imageId}
          imageUrl={imageObj.imageUrl}
          imageId={imageObj.imageId}
          setImage={setImage}
        />
      ))}
    </div>
  );
};

export default ImageList;
