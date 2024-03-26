import thunk from 'redux-thunk';
import { applyMiddleware } from '@reduxjs/toolkit';

const middleware = applyMiddleware(
  thunk
);

export default middleware;