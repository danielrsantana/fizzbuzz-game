import * as actionTypes from '../constants/actionTypes';

export function addArticle(payload) {
  return { type: actionTypes.ADD_ARTICLE, payload };
}
