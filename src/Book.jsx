import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import DropDownMenu from "./DropDownMenu";

class Book extends Component {
  constructor() {
    super();
    this.state = { isOpen: false };
  }
  imgLoader(book) {
    if (book.hasOwnProperty("cover_i") == true) {
      return "https://covers.openlibrary.org/b/id/" + book.cover_i + ".jpg";
    } else {
      return "https://s3-us-west-2.amazonaws.com/s.cdpn.io/387928/book%20placeholder.png";
    }
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

  triggerMenu(bool) {
    this.setState({ isOpen: !bool });
    console.log(this.state.isOpen);
  }

  render() {
    // var title = this.props.title;
    // var author = this.props.book.author;
    // console.log(this.props.book);
    console.log(JSON.parse(localStorage.getItem("books")));

    return (
      <div
        key={this.props.book.key}
        className="book d-flex flex-column h-100 w-auto gap-2"
      >
        <div className="img-cont">
          <img
            className="w-100 h-100"
            src={this.imgLoader(this.props.book)}
          ></img>
        </div>
        <div className="dropdown">
          <button
            className="book-button btn dropdown-toggle d-flex align-items-center justify-content-center rounded rounded-circle text-white"
            // type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            onClick={(e) => this.triggerMenu(this.state.isOpen)}
          >
            {/* <FontAwesomeIcon className="text-white" icon={faCaretDown} /> */}
          </button>
          {this.state.isOpen && (
            <DropDownMenu
              book={this.props.book}
              handleActionMenu={this.handleActionMenu}
              handleDropDown={this.triggerMenu}
            />
          )}
        </div>

        <div className="book-title my-2 fw-bold fs-6">
          {this.props.book.title}
        </div>
        <div className="book-author text-muted fs-6">
          {this.props.book.author_name?.map((item, index) => {
            if (index == this.props.book.author_name.length - 1) {
              return item;
            } else {
              return item + ", ";
            }
          })}
        </div>
      </div>
    );
  }
}

export default Book;
