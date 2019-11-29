import axios from "axios";

/** define action */
const GET_NEWSLIST = "GET_NEWSLIST";
const REQUEST_NEWSLIST = "REQUEST_NEWSLIST";
const GET_VIDEOLIST = "GET_VIDEOLIST";

/** define action function */
export const setNewsList = newsList => ({
  type: GET_NEWSLIST,
  newsList
});

export const requestNewsList = () => ({
  type: REQUEST_NEWSLIST
});

export const setVideoList = videoList => ({
  type: GET_VIDEOLIST,
  videoList
});

export const getNewsList = () => async dispatch => {
  dispatch(requestNewsList());

  try {
    const queryStr = encodeURI("포레스텔라");
    const url = "/v1/search/news.json?query=" + queryStr + "&display=10&start=1&sort=sim";

    const config = {
      headers: {
        "X-Naver-Client-Id": "65W8kd2kxGp2Fj6ufHZq",
        "X-Naver-Client-Secret": "vM18wFU3wW"
      }
    };

    const {
      data: { items }
    } = await axios.get(url, config);

    dispatch(setNewsList(items));
  } catch (error) {
    console.log(error);
  }
};

export const getVideoList = () => async dispatch => {
  try {
    const queryStr = encodeURI("포레스텔라");
    const url = "https://dapi.kakao.com/v2/search/vclip?query=" + queryStr + "&sort=recency";

    const config = {
      headers: {
        Authorization: "KakaoAK 0cbab15cb6a4273f546992f36e7b90e0"
      },
      contentType: "application/json"
    };

    const {
      data: { documents }
    } = await axios.get(url, config);

    dispatch(setVideoList(documents));
    console.log(documents);
  } catch (error) {
    console.log(error);
  }
};
/** define initial state */
const initialState = {
  newsList: [],
  videoList: [],
  isLoading: true
};

/** define reduce function */
function media(state = initialState, action) {
  switch (action.type) {
    case GET_NEWSLIST:
      return {
        ...state,
        newsList: action.newsList,
        isLoading: false
      };
    case REQUEST_NEWSLIST:
      return {
        ...state,
        isLoading: true
      };
    case GET_VIDEOLIST:
      return {
        ...state,
        videoList: action.videoList
      };
    default:
      return state;
  }
}

export default media;
