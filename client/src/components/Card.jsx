import React from "react";
import { download } from "../assets";
import { downloadImage } from "../utils";
import "../styles/card.css";

const Card = ({ _id, name, prompt, image }) => (
  <div className="card">
    <img className="card-img" src={image} alt={prompt} />
    <div className="prompt-box">
      <p className="prompt-box-para">{prompt}</p>

      <div className="profile-box">
        <div className="profile-box-container">
          <div className="profile-img">{name[0]}</div>
          <p className="profile-name">{name}</p>
        </div>
        <button
          type="button"
          onClick={() => downloadImage(_id, image)}
          className="download-btn"
        >
          <img src={download} alt="download" className="download-btn-img" />
        </button>
      </div>
    </div>
  </div>
);

export default Card;
