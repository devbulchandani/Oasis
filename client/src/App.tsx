import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  // Navigate,
} from "react-router-dom";
import Layout from "./layouts/layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout>
          <p>HomePage</p>
        </Layout>}
        />

        <Route path="/search" element={<Layout>
          <p>Search page</p>
        </Layout>}
        />

        <Route path="/register" element={<Layout>
          <Register />
        </Layout>}
        />

        <Route path="/sign-in" element={<Layout>
          <SignIn />
        </Layout>}
        />


        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

    </Router>
  )
}

export default App;
