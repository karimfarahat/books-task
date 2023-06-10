import "./styles/App.scss";
import "./bootstrap.min.css";
// import Header from "./Header";
// import Search from "./pages/Search";
import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
// import Book from "./Book";
class App extends Component {
  constructor() {
    super();
    this.state = { books: [] };
  }

  render() {
    // console.log(this.state);

    return (
      <div className="App container-fluid m-0 p-0">
        {/* <Header />
        <Search /> */}
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
