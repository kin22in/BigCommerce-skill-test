import React from "react";
export default function BannerImage() {
  return (
    <div className="banner-wrapper">
      <div className="container text-center banner-text">
        <div className="row justify-content-center align-items-center">
          <div className="w-50 bg-dark">this is data</div>
        </div>
      </div>
      <img
        src="media/plates-header.jpg"
        className="w-100 img-fluid banner-image"
        alt="Banner Image - Plates Title"
      />
    </div>
  );
}
