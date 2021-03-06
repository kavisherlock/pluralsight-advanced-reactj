import React from 'react';
import PropTypes from 'prop-types';
import pickBy from 'lodash.pickby';

import ArticleList from './ArticleList';
import Timestamp from './Timestamp';
import SearchBar from './SearchBar';

class App extends React.Component {
  static childContextTypes = {
    store: PropTypes.object
  }

  getChildContext() {
    return {
      store: this.props.store
    };
  }

  appState = () => {
    const {
      articles,
      searchTerm,
    } = this.props.store.getState();

    return { articles, searchTerm };
  }

  state = this.appState();

  onStoreChange = () => {
    this.setState(this.appState());
  }

  componentDidMount() {
    this.subscriptionId = this.props.store.subscribe(this.onStoreChange);
    this.props.store.startClock();
  }

  componentWillUnmount() {
    this.props.store.unsubscribe(this.subscriptionId);
  }

  render() {
    const {
      articles,
      searchTerm,
    } = this.state;

    let filteredArticles = articles;
    const searchRE = new RegExp(searchTerm, 'i');
    if (searchTerm) {
      filteredArticles = pickBy(articles, (value) => {
        return value.title.match(searchRE) ||
          value.body.match(searchRE);
      });
    }

    return (
      <div>
        <Timestamp />
        <SearchBar />
        <ArticleList
          articles={filteredArticles}
        />
      </div>
    );
  }
}

export default App;
