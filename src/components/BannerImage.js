import React from "react";
import "./BannerImage.css";

export default function BannerImage() {
  return (
    <div className="container-fluid img-fluid jumbotron-fluid px-0">
      <div className="row">
        <div className="col-6 bg-dark text-white d-flex flex-column justify-content-center text-center mx-auto banner-text">
          <h1 className="mb-3">
            <u>Plates</u>
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at
            purus pulvinar, placerat turpis ac, interdum metus. In eget massa
            sed enim hendrerit auctor a eget."
          </p>
        </div>
      </div>
    </div>
  );
}
