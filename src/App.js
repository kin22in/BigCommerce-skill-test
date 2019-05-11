import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Header from "./header/Header";
import Category from "./category/Category";
import Cart from "./cart/Cart";
import Product from "./product/Product";
import Journal from "./journal/Journal";
import PageNotFound from "./pageNotFound/PageNotFound";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <main className="main-content">
          <Switch>
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/productdetails" component={Product} />
            <Route exact path="/journal" component={Journal} />
            <Route exact path="/" component={Category} />
            <Route component={PageNotFound} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
