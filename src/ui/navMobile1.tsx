"use client";

import React from "react";
import styled from "styled-components";
import { FiHome, FiUsers, FiSearch, FiMessageCircle, FiSettings } from "react-icons/fi";

const NavMenu = () => {
  return (
    <StyledWrapper>
      <div className="cyber-signboard">
        <div className="cyber-switch">
          <input
            type="radio"
            id="cyber-opt-1"
            name="cyber-mode"
            defaultChecked
          />
          <label htmlFor="cyber-opt-1" className="cyber-label" aria-label="Home">
            <FiHome className="icon" />
            <span className="glare" />
          </label>

          <input type="radio" id="cyber-opt-2" name="cyber-mode" />
          <label htmlFor="cyber-opt-2" className="cyber-label" aria-label="Friends">
            <FiUsers className="icon" />
            <span className="glare" />
          </label>

          <input type="radio" id="cyber-opt-3" name="cyber-mode" />
          <label htmlFor="cyber-opt-3" className="cyber-label" aria-label="Search">
            <FiSearch className="icon" />
            <span className="glare" />
          </label>

          <input type="radio" id="cyber-opt-4" name="cyber-mode" />
          <label htmlFor="cyber-opt-4" className="cyber-label" aria-label="Chat">
            <FiMessageCircle className="icon" />
            <span className="glare" />
          </label>

          <input type="radio" id="cyber-opt-5" name="cyber-mode" />
          <label htmlFor="cyber-opt-5" className="cyber-label" aria-label="Setting">
            <FiSettings className="icon" />
            <span className="glare" />
          </label>

          <div className="cyber-highlight">
            <div className="highlight-inner" />
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .cyber-signboard {
    --primary-glow: #00f0ff;
    --secondary-glow: #7000ff;
    --inactive-color: #5c6b7f;
    --bg-dark: #0f1016;

    --switch-width: 360px;
    --switch-height: 80px;
    --padding: 6px;

    /* ✅ 5 items */
    --count: 5;
    --item-width: calc((var(--switch-width) - (var(--padding) * 2)) / var(--count));

    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    font-family: sans-serif;
  }

  .cyber-switch {
    position: relative;
    width: var(--switch-width);
    height: var(--switch-height);
    background: var(--bg-dark);
    border-radius: 20px;
    box-shadow:
      inset 0 2px 4px rgba(0, 0, 0, 0.8),
      inset 0 -1px 2px rgba(255, 255, 255, 0.05),
      0 20px 40px -10px rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    padding: var(--padding);
    box-sizing: border-box;
    overflow: hidden;
    border: 1px solid #1f222e;
  }

  .cyber-switch input[type="radio"] {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .cyber-label {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 2;
    position: relative;
    border-radius: 14px;
    transition: all 0.3s ease;
    -webkit-tap-highlight-color: transparent;
  }

  /* ✅ react-icons */
  .cyber-label .icon {
    width: 28px;
    height: 28px;
    color: var(--inactive-color);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5));
  }

  .cyber-highlight {
    position: absolute;
    top: var(--padding);
    left: var(--padding);
    width: var(--item-width);
    height: calc(var(--switch-height) - (var(--padding) * 2));
    background: transparent;
    z-index: 1;
    transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    pointer-events: none;
  }

  .highlight-inner {
    width: 100%;
    height: 100%;
    border-radius: 14px;
    background: linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.02) 100%
    );
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow:
      0 0 20px var(--primary-glow),
      inset 0 0 15px rgba(0, 240, 255, 0.2);
    backdrop-filter: blur(4px);
    position: relative;
    animation: neon-pulse 3s infinite ease-in-out;
  }

  .highlight-inner::after {
    content: "";
    position: absolute;
    top: 0;
    left: 10%;
    width: 80%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.8),
      transparent
    );
    opacity: 0.8;
  }

  /* ✅ positions (0..400%) vì 5 item */
  #cyber-opt-1:checked ~ .cyber-highlight { transform: translateX(0%); }
  #cyber-opt-2:checked ~ .cyber-highlight { transform: translateX(100%); }
  #cyber-opt-3:checked ~ .cyber-highlight { transform: translateX(200%); }
  #cyber-opt-4:checked ~ .cyber-highlight { transform: translateX(300%); }
  #cyber-opt-5:checked ~ .cyber-highlight { transform: translateX(400%); }

  /* ✅ active icon effects */
  #cyber-opt-1:checked ~ [for="cyber-opt-1"] .icon,
  #cyber-opt-2:checked ~ [for="cyber-opt-2"] .icon,
  #cyber-opt-3:checked ~ [for="cyber-opt-3"] .icon,
  #cyber-opt-4:checked ~ [for="cyber-opt-4"] .icon,
  #cyber-opt-5:checked ~ [for="cyber-opt-5"] .icon {
    color: #fff;
    filter: drop-shadow(0 0 8px var(--primary-glow));
    transform: scale(1.1);
  }

  .cyber-switch input:focus-visible ~ .cyber-highlight .highlight-inner {
    border: 1px solid #fff;
    box-shadow: 0 0 30px var(--primary-glow);
  }

  .cyber-label:hover .icon {
    color: #aeb9cc;
  }
  .cyber-label:active .icon {
    transform: scale(0.95);
  }

  .glare {
    position: absolute;
    inset: 0;
    border-radius: 14px;
    background: radial-gradient(
      circle at 50% -20%,
      rgba(255, 255, 255, 0.1),
      transparent 60%
    );
    opacity: 0;
    transition: opacity 0.3s;
  }
  .cyber-label:hover .glare {
    opacity: 1;
  }

  @keyframes neon-pulse {
    0%,
    100% {
      box-shadow:
        0 0 20px var(--primary-glow),
        inset 0 0 15px rgba(0, 240, 255, 0.2);
    }
    50% {
      box-shadow:
        0 0 25px var(--primary-glow),
        inset 0 0 20px rgba(0, 240, 255, 0.3);
    }
  }
`;

export default NavMenu;
