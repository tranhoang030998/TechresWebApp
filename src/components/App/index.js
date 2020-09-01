import React, { Component, Suspense } from "react";
import { Provider } from "react-redux";
import { getTwilioUser } from "../../redux/actions/twilio";
import store from "../../redux/store";
import Messenger from "../Messenger";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import Login from "../Login";
import PrivateRoute from "./PrivateRoute";
import { loadUser } from "../../redux/actions/auth";
import Register from "../Login/Register";

function waitingComponent(ComponentItem) {
  return (props) => (
    <Suspense fallback={<LoadingSpinner />}>
      <ComponentItem {...props} />
    </Suspense>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      twilioUser: null,
    };
  }

  componentDidMount() {
    store.dispatch(loadUser());
    store.dispatch(getTwilioUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <PrivateRoute
              exact
              path="/"
              component={waitingComponent(Messenger)}
            />
            {/* <Route exact path="/" render={waitingComponent(Messenger)} /> */}
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" render={waitingComponent(Login)} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
// </Router><div className="App">
//             <Messenger />
//           </div>
