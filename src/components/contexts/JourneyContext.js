import React, { useReducer } from "react";

const Context = React.createContext();

const INITIAL_STATE = {};

const ACTIONS_JOURNEY_INFO = {
  SET_START: 'start',
  SET_END: 'end',
  SET_DIRECTIONS: 'directions',
  SET_ALL: "all",
};

const reducerJourneyInfo = (state, action) => {
  switch (action.type) {
    case ACTIONS_JOURNEY_INFO.SET_START:
      if (state.start && !action.payload.value) {
        return { ...state, [action.payload.field]: null };
      }
      return { ...state, [action.payload.field]: action.payload.value };
    case ACTIONS_JOURNEY_INFO.SET_END:
      if (state.end && !action.payload.value) {
        return { ...state, [action.payload.field]: null };
      }
      return { ...state, [action.payload.field]: action.payload.value };
    case ACTIONS_JOURNEY_INFO.SET_DIRECTIONS:
      return { ...state, [action.payload.field]: action.payload.value };
    case ACTIONS_JOURNEY_INFO.SET_ALL:
      return { ...action.payload.value };
    default:
      throw new Error();
  }
};

export const JourneyStore = ({ children }) => {
  const [journey, dispatchJourney] = useReducer(reducerJourneyInfo, INITIAL_STATE)

  return (
    <Context.Provider value={[journey, dispatchJourney]}>
      {children}
    </Context.Provider>
  );
};

export default Context;
