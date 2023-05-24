export const ADD_PLAYER_INFO = 'ADD_PLAYER_INFO';
export const INCR_SCORE = 'INCR_SCORE';

export const addPlayerInfo = (payload) => ({
  type: ADD_PLAYER_INFO,
  payload,
});

export const incrSccore = (payload) => ({
  type: INCR_SCORE,
  payload,
});
