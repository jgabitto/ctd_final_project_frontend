import React, { useReducer } from "react";

const Context = React.createContext();

const INITIAL_STATE = {};

const ACTIONS_JOURNEY_INFO = {
  SET_START: 'start',
  SET_END: 'end',
  SET_ALL: "all",
};

const reducerJourneyInfo = (state, action) => {
  switch (action.type) {
    case ACTIONS_JOURNEY_INFO.SET_START:
      return { ...state, [action.payload.field]: action.payload.value };
    case ACTIONS_JOURNEY_INFO.SET_END:
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
