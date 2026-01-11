import React from "react";
import styled from "styled-components";

const MessageInput = () => {
  return (
    <StyledWrapper>
      <div className="messageBox">
        <div className="fileUploadWrapper">
          <label htmlFor="file">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 337 337"
              aria-hidden="true"
            >
              <circle
                strokeWidth={20}
                stroke="#6c6c6c"
                fill="none"
                r="158.5"
                cy="168.5"
                cx="168.5"
              />
              <path
                strokeLinecap="round"
                strokeWidth={25}
                stroke="#6c6c6c"
                d="M167.759 79V259"
              />
              <path
                strokeLinecap="round"
                strokeWidth={25}
                stroke="#6c6c6c"
                d="M79 167.138H259"
              />
            </svg>
            <span className="tooltip">Add an image</span>
          </label>
          <input type="file" id="file" name="file" />
        </div>

        <input
          required
          placeholder="Message..."
          type="text"
          className="messageInput"
        />

        <button className="sendButton" type="button" aria-label="Send message">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 664 663">
            <path
              fill="none"
              d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
            />
            <path
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="33.67"
              stroke="#6c6c6c"
              d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
            />
          </svg>
        </button>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  /* wrapper: full width */
  width: 100%;
  padding: 5px 8px;
  background: #00000000;

  .messageBox {
    width: 100%;
    height: 50px; /* ✅ cao ~55px */
    display: flex;
    align-items: center;
    gap: 10px;

    background-color: #2d2d2d;
    padding: 0 14px;
    border-radius: 14px;
    border: 1px solid rgb(63, 63, 63);
  }

  .messageBox:focus-within {
    border: 1px solid rgb(110, 110, 110);
  }

  .fileUploadWrapper {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
  }

  #file {
    display: none;
  }

  .fileUploadWrapper label {
    cursor: pointer;
    width: 34px;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .fileUploadWrapper label svg {
    height: 18px;
  }

  .fileUploadWrapper label svg path,
  .fileUploadWrapper label svg circle {
    transition: all 0.25s;
  }

  .fileUploadWrapper label:hover svg path {
    stroke: #fff;
  }

  .fileUploadWrapper label:hover svg circle {
    stroke: #fff;
    fill: #3c3c3c;
  }

  .fileUploadWrapper label:hover .tooltip {
    display: block;
    opacity: 1;
  }

  .tooltip {
    position: absolute;
    top: -42px;
    display: none;
    opacity: 0;
    color: white;
    font-size: 11px;
    white-space: nowrap;

    background-color: #000;
    padding: 6px 10px;
    border: 1px solid #3c3c3c;
    border-radius: 7px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.35);
    transition: all 0.25s;
  }

  .messageInput {
    flex: 1 1 auto; /* ✅ full ngang phần còn lại */
    height: 100%;
    background-color: transparent;
    outline: none;
    border: none;
    padding-left: 6px;
    color: white;
    font-size: 14px;
    min-width: 0; /* ✅ chống tràn trên mobile */
  }

  /* đổi selector theo class */
  .messageInput:focus ~ .sendButton svg path,
  .messageInput:valid ~ .sendButton svg path {
    fill: #3c3c3c;
    stroke: white;
  }

  .sendButton {
    height: 100%;
    background-color: transparent;
    outline: none;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.2s;
    flex: 0 0 auto;
  }

  .sendButton:active {
    transform: scale(0.95);
  }

  .sendButton svg {
    height: 18px;
    transition: all 0.25s;
  }

  .sendButton svg path {
    transition: all 0.25s;
  }

  .sendButton:hover svg path {
    fill: #3c3c3c;
    stroke: white;
  }
`;

export default MessageInput;
