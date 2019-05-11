import React, { Component } from "react";
import details from "./data/details";
import { loadStoreProducts } from "./services/storeServices.js";

const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    products: [],
    cart: [],
    cartTotal: 0,
    cartCount: 0,
    isModalOpen: false,
    modalRef: false,
    productDetail: details
  };
  wrapperRef = "";
  componentDidMount() {
    this.getProductsData();
    window.addEventListener("click", this.dismissModal);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.dismissModal);
  }

  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  dismissModal = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ isModalOpen: false });
    }
  };

  openModal = event => {
    event.stopPropagation();
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false
    });
  };

  getProductsData = () => {
    //Calling service to get Data from the Mock Api
    loadStoreProducts().then(res => {
      let products = [];
      res.forEach((item, index) => {
        let singleItem = { ...item };
        //creating a unique if based of index
        singleItem.productId = index + 1;
        // creating new array based of the new object
        products = [...products, singleItem];
      });
      this.setState({
        products
      });
    });
  };

  getItemById = (arr, productId) => {
    return this.state[arr].find(item => item.productId === productId);
  };

  getIndexOf = (arr, productId) => {
    return this.state[arr]
      .map(function(x) {
        return x.productId;
      })
      .indexOf(productId);
  };

  updateCartMetaDetails = tempCart => {
    let getTotal = value => {
      let tempTotal = tempCart.map(item => item[value]);
      return (tempTotal =
        tempTotal.length > 0
          ? tempTotal.reduce((prev, item) => prev + item)
          : 0);
    };

    return { cartTotal: getTotal("total"), cartQuantity: getTotal("quantity") };
  };

  handleDetails = productId => {
    let productDetail = this.getItemById("products", productId);
    this.setState({
      productDetail
    });
  };

  incrementQuanity = (productId, setQuantity) => {
    let tempCart = [...this.state.cart];
    let getExisitngIndex = this.getIndexOf("cart", productId);
    tempCart[getExisitngIndex].quantity =
      setQuantity !== undefined
        ? tempCart[getExisitngIndex].quantity + setQuantity
        : tempCart[getExisitngIndex].quantity + 1;
    tempCart[getExisitngIndex].total =
      tempCart[getExisitngIndex].quantity * tempCart[getExisitngIndex].price;
    let cartMetaDetails = this.updateCartMetaDetails(tempCart);
    this.setState({
      cart: tempCart,
      cartTotal: cartMetaDetails.cartTotal,
      cartCount: cartMetaDetails.cartQuantity
    });
  };

  decrementQuanity = productId => {
    let tempCart = [...this.state.cart];
    let getExisitngIndex = this.getIndexOf("cart", productId);
    if (tempCart[getExisitngIndex].quantity > 0) {
      tempCart[getExisitngIndex].quantity =
        tempCart[getExisitngIndex].quantity - 1;
      tempCart[getExisitngIndex].total =
        tempCart[getExisitngIndex].quantity * tempCart[getExisitngIndex].price;
      let cartMetaDetails = this.updateCartMetaDetails(tempCart);
      this.setState({
        cart: tempCart,
        cartTotal: cartMetaDetails.cartTotal,
        cartCount: cartMetaDetails.cartQuantity
      });
    }
  };

  createNewCartEntry(productId, setQuantity) {
    let productToAdd = this.getItemById("products", productId);
    let tempProduct = { ...productToAdd };
    let tempCart = [...this.state.cart];
    tempProduct.quantity = setQuantity ? setQuantity : 1;
    tempProduct.total = tempProduct.quantity * tempProduct.price;
    tempCart.push(tempProduct);
    let cartMetaDetails = this.updateCartMetaDetails(tempCart);
    this.setState({
      cart: tempCart,
      cartTotal: cartMetaDetails.cartTotal,
      cartCount: cartMetaDetails.cartQuantity
    });
  }

  removeFromCart = (event, productId) => {
    event.stopPropagation();
    let indexOfCartItem = this.getIndexOf("cart", productId);
    let tempCart = [...this.state.cart];
    //remove the item at that index
    tempCart.splice(indexOfCartItem, 1);
    let cartMetaDetails = this.updateCartMetaDetails(tempCart);
    this.setState({
      cart: tempCart,
      cartTotal: cartMetaDetails.cartTotal,
      cartCount: cartMetaDetails.cartQuantity,
    });
  };

  addToCart = (productId, setQuantity) => {
    let indexOfCartItem = this.getIndexOf("cart", productId);
    indexOfCartItem >= 0
      ? this.incrementQuanity(productId, setQuantity)
      : this.createNewCartEntry(productId, setQuantity);
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          removeFromCart: this.removeFromCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          getIndexOf: this.getIndexOf,
          getItemById: this.getItemById,
          setWrapperRef: this.setWrapperRef,
          incrementQuanity: this.incrementQuanity,
          decrementQuanity: this.decrementQuanity,
          handleDetails: this.handleDetails,
          addToCart: this.addToCart
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
