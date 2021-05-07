import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "pages/Home";
import { DndProvider } from "react-dnd-multi-backend";
import HTML5toTouch from "react-dnd-multi-backend/dist/esm/HTML5toTouch";
import Navigation from "components/Navigation";
// import PrivateRoute from "components/user/PrivateRoute";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPen,
  faPlusSquare,
  faTrash,
  faExclamationTriangle,
  faTimesCircle,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faPlusSquare,
  faPen,
  faTrash,
  faExclamationTriangle,
  faTimesCircle,
  faSave
);

function App() {
  return (
    <Router>
      <DndProvider options={HTML5toTouch}>
        <div className="App">
          <Navigation></Navigation>
          <Switch>
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </DndProvider>
    </Router>
  );
}

export default App;
