import rootReducer from "./rootReducer";
import { createStore } from "redux";

let Store = createStore(rootReducer);

export default Store;