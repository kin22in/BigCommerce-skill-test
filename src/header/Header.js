import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import logo from "../header/logo.png";
import Category from "../category/Category";
import Cart from "../cart/Cart";
import Product from "../product/Product";
import Journal from "../journal/Journal";
import PageNotFound from "../pageNotFound/PageNotFound";
import { ProductConsumer } from "../context.js";
import Modal from "../components/Modal";
export default class Header extends Component {
  render() {
    return (
      <React.Fragment>
        <nav className="nav fixed-top bg-white justify-content-between align-items-center">
          <Link className="nav-link active" to="/">
            <img src={logo} alt="logo" />
          </Link>

          <ul className="nav justify-content-center">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="/Shop">
                Shop (DropDOwn)
              </Link>
            </li> */}
            <li className="nav-item dropdown">
              <a
                href="https://www.bigcommerce.com.au/product/"
                className="nav-link btn btn-link dropdown-toggle d-none d-md-block"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Shop
              </a>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link" to="/journal">
                Journal
              </Link>
            </li>
            <li className="nav-item">
              <a
                className="nav-link btn btn-link dropdown-toggle d-none d-md-block"
                data-toggle="dropdown"
                href="https://www.bigcommerce.com.au/"
                aria-haspopup="true"
                aria-expanded="false"
              >
                More
              </a>
            </li>
          </ul>
          <ProductConsumer>
            {({ openModal, cartCount }) => {
              return (
                <li className="nav-item">
                  <button
                    className="btn btn-link dropdown-toggle"
                    onClick={event => {
                      openModal(event);
                    }}
                  >
                    My Cart ({cartCount})
                  </button>
                </li>
              );
            }}
          </ProductConsumer>
        </nav>
        <Modal />
        <Switch>
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/productdetails" component={Product} />
          <Route exact path="/journal" component={Journal} />
          <Route exact path="/" component={Category} />
          <Route component={PageNotFound} />
        </Switch>
      </React.Fragment>
    );
  }
}
