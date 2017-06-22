import { omit } from 'lodash';

//import {  } from '../actions/search-filter.action.js';

const INITIAL_STATE = {
  hello: 'world'
};

export default function searchFilter (state=INITIAL_STATE, action) {
  switch (action.type) {
    default:
      return {...state};
  }
}
