import React, { PureComponent } from "react";
import { connect } from "react-redux";
import News from "../components/news/News";
import { getNewsList } from "../modules/news";

class NewsContainer extends PureComponent {
  componentDidMount() {
    const { getNewsList } = this.props;
    getNewsList();
  }

  render() {
    const { newsList } = this.props;
    return (
      <div>
        {newsList.map((news, idx) => (
          <News news={news} idx={idx} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  newsList: state.news.newsList
});

const mapToDispatch = dispatch => ({
  getNewsList: () => {
    dispatch(getNewsList());
  }
});

export default connect(mapStateToProps, mapToDispatch)(NewsContainer);
