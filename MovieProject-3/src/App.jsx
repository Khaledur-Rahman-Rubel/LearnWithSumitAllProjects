import { useReducer, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MovieContext, ThemeContext } from "./context";
import Footer from "./Footer";
import Header from "./Header";
import MovieList from "./movie/MovieList";
import { cartReducer, initialState } from "./reducer/CartReducer";
import Sidebar from "./Sidebar";

const App = () => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <MovieContext.Provider value={{ state, dispatch }}>
        <div className={`w-full h-full ${darkMode ? "dark" : " "}`}>
          <Header />
          <main>
            <div className="container grid lg:grid-cols-[218px_1fr] gap-[3.5rem]">
              <Sidebar />
              <MovieList />
            </div>
          </main>
          <Footer />
          <ToastContainer />
        </div>
      </MovieContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
