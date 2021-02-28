import { createStore } from "redux";

const estado = {
  user: {},
  enterpreseSelected: {},
  enterprises: [],
};

function reducer(state = estado, action) {
  switch (action.type) {
    case "Update_User":
      return {
        ...state,
        user: action.user,
      };
    case "Enterprese_Select":
      return {
        ...state,
        enterpreseSelected: action.enterpreseSelected,
      };
    case "Enterpreses_Search":
      return {
        ...state,
        enterprises: action.enterprises,
      };
    default:
      break;
  }

  return state;
}

const store = createStore(reducer);

export default store;
