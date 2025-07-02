import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/scrollToTop/scrollToTop";
import { routes } from "./routing/webRoutes";

function App() {
  return <Router>
    <ScrollToTop />
    <Routes>
      {
        routes.map(({ path, component:Component }) => (
          <Route key={path} path={path}
          element={<Component />}
          />
        ))
    }
    </Routes>
  </Router>;
}

export default App;
