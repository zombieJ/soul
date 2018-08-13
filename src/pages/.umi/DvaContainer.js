import { Component } from 'react';
import dva from 'dva';
import createLoading from 'dva-loading';

let app = dva({
  history: window.g_history,
  
});

window.g_app = app;
app.use(createLoading());
app.use(require('/Users/jilin/projects/soul/node_modules/_dva-immer@0.2.3@dva-immer/lib/index.js').default());
app.model({ namespace: 'movie', ...(require('/Users/jilin/projects/soul/src/models/movie.ts').default) });

class DvaContainer extends Component {
  render() {
    app.router(() => this.props.children);
    return app.start()();
  }
}

export default DvaContainer;
