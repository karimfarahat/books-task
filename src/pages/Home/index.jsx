import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { NamedRoute } from "../../routes";
import Book from "../../Book";
import Header from "../../Header";
class Home extends Component {
  constructor() {
    super();
    this.handleActionMenu = this.handleActionMenu.bind(this);
    this.state = { navigate: false, books: [] };
  }

  handleActionMenu(book, action) {
    let category = { ...JSON.parse(localStorage.getItem("books")) };
    switch (action) {
      case "currently-reading":
        console.log("category", book);
        if (category?.currentlyRead?.some((item) => item.key === book.key))
          return;
        else {
          for (const key of ["wantToRead", "read"]) {
            if (category[key]?.some((item) => item.key === book.key)) {
              category[key] = category[key]?.filter(
                (item) => item.key != book.key
              );
            }
          }
          localStorage.setItem(
            "books",
            JSON.stringify({
              ...category,
              currentlyRead: [...category?.currentlyRead, book],
            })
          );
        }
        break;

      case "want-to-read":
        if (category?.wantToRead?.some((item) => item.key === book.key)) return;
        else {
          for (const key of ["currentlyRead", "read"]) {
            if (category[key]?.some((item) => item.key === book.key)) {
              category[key] = category[key].filter(
                (item) => item.key != book.key
              );
            }
          }

          localStorage.setItem(
            "books",
            JSON.stringify({
              ...category,
              wantToRead: [...category?.wantToRead, book],
            })
          );
        }
        break;
      case "read":
        if (category?.read?.some((item) => item.key === book.key)) return;
        else {
          for (const key of ["wantToRead", "currentlyRead"]) {
            if (category[key]?.some((item) => item.key === book.key)) {
              category[key] = category[key].filter(
                (item) => item.key != book.key
              );
            }
          }
          localStorage.setItem(
            "books",
            JSON.stringify({ ...category, read: [...category?.read, book] })
          );
        }
        break;

      default:
        break;
    }
    // this.setState({ isOpen: false });
  }

  handleNavigate() {
    this.setState({ navigate: true });
  }
  componentDidMount() {
    const books = localStorage.getItem("books");
    if (books) {
      console.log("ddd", JSON.parse(books));
      this.setState({ books: JSON.parse(books) });
    } else {
      //   console.log("entered else");
      localStorage.setItem(
        "books",
        JSON.stringify({
          currentlyRead: [],
          wantToRead: [],
          read: [],
        })
      );
      this.setState({ books: [] });
    }
  }
  render() {
    return (
      <div>
        <Header />
        <button
          className="search-button btn d-flex justify-content-center rounded rounded-circle text-white"
          onClick={() => this.handleNavigate()}
        >
          +
        </button>
        {this.state.navigate && <Navigate to={NamedRoute.search} />}

        <div className="container">
          <div className="row g-4 py-5">
            <h1>Currently Read</h1>
            <hr />
            {this.state.books?.currentlyRead?.length > 0 &&
              this.state.books?.currentlyRead?.map((item) => (
                <div key={item.key} className="col-md-3">
                  <Book book={item} handleActionMenu={this.handleActionMenu} />
                </div>
              ))}
          </div>

          <div className="row g-4 py-5">
            <h1>Want to Read</h1>
            <hr />
            {this.state.books?.wantToRead?.length > 0 &&
              this.state.books?.wantToRead?.map((item) => (
                <div key={item.key} className="col-md-3">
                  <Book book={item} handleActionMenu={this.handleActionMenu} />
                </div>
              ))}
          </div>

          <div className="row g-4 py-5">
            <h1>Read</h1>
            <hr />
            {this.state.books?.read?.length > 0 &&
              this.state.books.read.map((item) => (
                <div key={item.key} className="col-md-3">
                  <Book book={item} handleActionMenu={this.handleActionMenu} />
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
