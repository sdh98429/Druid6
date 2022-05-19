import React from "react";
import "./BodyBlackoutStyle.scss";

export default function BodyBlackoutStyle() {
  return (
    <div className="body-blackout-style">
      <p className="blackout-text">로딩중...</p>
      <img src="/images/giphy.gif" alt="" className="loading-spinner" />
    </div>
  );
}
