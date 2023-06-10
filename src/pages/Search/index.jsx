import React, { Component } from "react";
import { debounce } from "throttle-debounce";
import Book from "../../Book";

export default class Search extends Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = props;
  //   }
  constructor() {
    super();
    this.state = { books: [] };
  }

  fetchApi = debounce(1000, (value) => {
    return fetch("https://openlibrary.org/search.json?q=" + value)
      .then((response) => response.json())
      .then((booksList) => {
        this.setState({ books: booksList.docs });
      })
      .catch((error) => console.log("error", error));
  });

  render() {
    // console.log(this.state.books[2]);
    return (
      <div className="container-fluid">
        <h3 className="fw-bold">Search</h3>
        <div className="container">
          <input
            className="search w-100 border-0 mb-5"
            name="book"
            onChange={(e) => this.fetchApi(e.target.value)}
            type="text"
          />
          <div className="row g-5">
            {this.state.books?.map((item) => {
              return (
                <div key={item.key} className="col-6 col-md-3 col-lg-2">
                  <Book
                    book={item}
                    handleActionMenu={this.props.handleActionMenu}
                  />
                </div>
              );
            })}

            {/* <div className="col-md-4">
              <Book book={this.props.books[0]} />
            </div>
            <div className="col-md-4">
              <Book book={this.props.books[1]} />
            </div>
            <div className="col-md-4">
              <Book book={this.props.books[2]} />
            </div> */}
          </div>
          {/* <h4 className="fw-bold">{this.props.books.docs[0]}</h4> */}
        </div>
      </div>
    );
  }
}
