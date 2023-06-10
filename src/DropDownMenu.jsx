import React, { Component } from "react";

export default class DropDownMenu extends Component {
  // handleSelectedAction() {
  //   this.props.handleDropDown(false);
  // }
  render() {
    // console.log( this.props.isOpen);
    return (
      <ul className="dropdown-menu show">
        <li
          onClick={() => {
            this.props.handleActionMenu(this.props.book, "currently-reading");
          }}
        >
          <a
            // onClick={handleSelectedFunction}
            value="currently-reading"
            className="dropdown-item"
            href="#"
          >
            Currently Reading
          </a>
        </li>
        <li
          onClick={() => {
            this.props.handleActionMenu(this.props.book, "want-to-read");
          }}
        >
          <a
            // onClick={handleSelectedFunction}
            value="want-to-read"
            className="dropdown-item"
            href="#"
          >
            Want to Read
          </a>
        </li>
        <li
          onClick={() => {
            this.props.handleActionMenu(this.props.book, "read");
          }}
        >
          <a
            // onClick={handleSelectedFunction}
            value="read"
            className="dropdown-item"
            href="#"
          >
            Read
          </a>
        </li>
        <li>
          <a
            onClick={() => {
              this.props.handleActionMenu(this.props.book, "read");
            }}
            value="none"
            className="dropdown-item"
            href="#"
          >
            None
          </a>
        </li>
      </ul>
    );
  }
}
