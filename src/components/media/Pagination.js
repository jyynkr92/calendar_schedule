import React from "react";

const Pagination = ({ moveOnePage, movePage, curPage }) => {
  return (
    <div>
      <span
        onClick={() => {
          moveOnePage(-1);
        }}
      >
        previous
      </span>
      <span>1</span> <span>2</span>
      <span>3</span> <span>4</span> <span>5</span> <span>6</span> <span>7</span> <span>8</span>
      <span>9</span> <span>10</span>
      <span
        onClick={() => {
          moveOnePage(1);
        }}
      >
        next
      </span>
    </div>
  );
};

export default Pagination;
