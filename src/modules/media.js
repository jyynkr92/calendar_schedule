import axios from "axios";
import config from "../config";

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
    const startPage = (pageNum - 1) * 12 + 1;
    const url =
      "https://us-central1-forestellaschedule.cloudfunctions.net/getNewsList?pageNum=" + startPage;

    const {
      data: { items }
    } = await axios.get(url);
    console.log(items);
    dispatch(setNewsList(items, pageNum));
  } catch (error) {
    console.log(error);
  }
};

export const getVideoList = pageNum => async dispatch => {
  try {
    const queryStr = encodeURI("포레스텔라");
    const url =
      "https://dapi.kakao.com/v2/search/vclip?query=" +
      queryStr +
      "&sort=recency&page=" +
      pageNum +
      "&size=12";

    const header = {
      headers: {
        Authorization: "KakaoAK " + config.kakaoKey
      },
      contentType: "application/json"
    };

    const {
      data: { documents }
    } = await axios.get(url, header);

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
  mode: "video"
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
