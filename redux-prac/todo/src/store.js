import myreducer from "./reducer/index";

import {createStore} from "redux";

const store=createStore(myreducer);

export default store;