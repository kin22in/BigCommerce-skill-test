import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("Testing App Component", () => {
  it("component should exists", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(".App").exists()).toBe(true);
  });

  it("component should have Header Component", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("Header").exists()).toBe(true);
  });

  it("component should have Switch Component", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("Switch").exists()).toBe(true);
  });
});
