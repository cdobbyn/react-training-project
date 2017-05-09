import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST } from '../actions/';
import {DELETE_POST} from "../actions/index";

export default function(state = {}, action) {
    switch (action.type) {
        case FETCH_POSTS:
            return _.mapKeys(action.payload.data, 'id');
        case FETCH_POST:
            // ES5
            // const post = action.payload.data;
            // const newState = {...state };
            // newState[post.id] = post;
            // return newState;

            // ES6
            return {...state,[action.payload.data.id]: action.payload.data};

        case DELETE_POST:
            // Do not include id, return new state without the old post
            return _.omit(state, action.payload);
        default:
            return state;
    }
}