import axios from "axios";

/** define action */
const GET_NEWSLIST = "GET_NEWSLIST";
const REQUEST_NEWSLIST = "REQUEST_NEWSLIST";
const GET_VIDEOLIST = "GET_VIDEOLIST";

/** define action function */
export const setNewsList = (newsList, curPage) => ({
  type: GET_NEWSLIST,
  newsList,
  curPage,
  mode: "news"
});

export const requestNewsList = () => ({
  type: REQUEST_NEWSLIST
});

export const setVideoList = (videoList, curPage) => ({
  type: GET_VIDEOLIST,
  videoList,
  curPage,
  mode: "video"
});

export const changeMediaMode = mode => dispatch => {
  if (mode === "news") {
    dispatch(getNewsList(1));
  } else {
    dispatch(getVideoList(1));
  }
};

export const getNewsList = pageNum => async dispatch => {
  dispatch(requestNewsList());

  try {
    const queryStr = encodeURI("포레스텔라");
    const startPage = pageNum * 10;
    const url =
      "/v1/search/news.json?query=" + queryStr + "&display=10&start=" + startPage + "&sort=sim";

    const config = {
      headers: {
        "X-Naver-Client-Id": "65W8kd2kxGp2Fj6ufHZq",
        "X-Naver-Client-Secret": "vM18wFU3wW"
      }
    };

    const {
      data: { items }
    } = await axios.get(url, config);

    dispatch(setNewsList(items, pageNum));
  } catch (error) {
    console.log(error);
  }
};

export const getVideoList = pageNum => async dispatch => {
  try {
    const queryStr = encodeURI("포레스텔라");
    const url =
      "https://dapi.kakao.com/v2/search/vclip?query=" + queryStr + "&sort=recency&page=" + pageNum;

    const config = {
      headers: {
        Authorization: "KakaoAK 0cbab15cb6a4273f546992f36e7b90e0"
      },
      contentType: "application/json"
    };

    const {
      data: { documents }
    } = await axios.get(url, config);

    dispatch(setVideoList(documents, pageNum));
  } catch (error) {
    console.log(error);
  }
};
/** define initial state */
const initialState = {
  newsList: [],
  videoList: [],
  isLoading: true,
  curPage: 1,
  mode: "news"
};

/** define reduce function */
function media(state = initialState, action) {
  switch (action.type) {
    case GET_NEWSLIST:
      return {
        ...state,
        newsList: action.newsList,
        isLoading: false,
        mode: action.mode,
        curPage: action.curPage
      };
    case REQUEST_NEWSLIST:
      return {
        ...state,
        isLoading: true
      };
    case GET_VIDEOLIST:
      return {
        ...state,
        videoList: action.videoList,
        mode: action.mode,
        curPage: action.curPage
      };
    default:
      return state;
  }
}

export default media;
