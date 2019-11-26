import axios from "axios";

/** define action */
const GET_NEWSLIST = "GET_NEWSLIST";
const REQUEST_NEWSLIST = "REQUEST_NEWSLIST";

/** define action function */
export const setNewsList = newsList => ({
  type: GET_NEWSLIST,
  newsList
});

export const requestNewsList = () => ({
  type: REQUEST_NEWSLIST
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
    console.log(items);
    dispatch(setNewsList(items));
  } catch (error) {
    console.log(error);
  }
};

/** define initial state */
const initialState = {
  newsList: [],
  isLoading: true
};

/** define reduce function */
function news(state = initialState, action) {
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
    default:
      return state;
  }
}

export default news;
