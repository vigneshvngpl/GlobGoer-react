import React from "react";
import "./RightSidebar.css";

export default function RightSidebar() {
  const sidebarData = [
    {
      id: 1,
      image: "/RightSideBar/ad1.jpg",
      title: "International Guideline",
      text: "COVID safety measures adopted by various countries including VISA restrictions, quarantine rules, etc.",
      button: "View guidelines",
    },
    {
      id: 2,
      image: "/RightSideBar/ad2.jpg",
      title: "We've found you a great deal!",
      text: "Get more, spend less with up to $575 off when you book your flight + stay together.",
      button: "Shop flight",
    },
    {
      id: 3,
      image: "/RightSideBar/ad3.png",
      title: "Log-in and get exclusive discounts!",
      text: "Log in and unlock all the exclusive offers and use wallet etc.",
      button: "Login/Create Account",
    },
  ];

  return (
    <aside className="right-sidebar">
      {sidebarData.map((card) => (
        <div className="sidebar-card" key={card.id}>
          <img
            src={card.image}
            alt={card.title}
            className="sidebar-card-banner"
          />

          <div className="sidebar-card-body">
            <h3 className="sidebar-card-title">{card.title}</h3>
            <p className="sidebar-card-text">{card.text}</p>
            <button className="sidebar-card-btn">{card.button}</button>
          </div>
        </div>
      ))}
    </aside>
  );
}