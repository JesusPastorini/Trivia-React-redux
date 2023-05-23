import { ADD_PLAYER_INFO, INCR_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_PLAYER_INFO:

    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };
  case INCR_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
    };
  default:
    return state;
  }
};

export default player;
