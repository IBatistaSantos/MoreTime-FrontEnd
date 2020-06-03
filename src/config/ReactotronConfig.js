import Reactotron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';
import reatotronSaga from 'reactotron-redux-saga';

if (process.env.NODE_ENV === 'development') {
  const tron = Reactotron.configure()
    .use(reactotronRedux())
    .use(reatotronSaga())
    .connect();

  tron.clear();

  console.tron = tron;
}
