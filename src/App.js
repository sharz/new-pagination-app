import React, {Component} from "react";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

import {configureStore} from "./store";
import {PersistGate} from "redux-persist/integration/react";
import Main from "./container/Main";

const {store, persistor} = configureStore();
console.log(store);
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <div className="App">
              <Main />
            </div>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
