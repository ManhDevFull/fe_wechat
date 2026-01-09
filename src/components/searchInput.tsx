'use client'
import React from 'react';
import styled from 'styled-components';

type SearchInputProps = {
  inputRef?: React.Ref<HTMLInputElement>;
  open?: boolean;
  autoFocus?: boolean;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
};

const SearchInput = ({ inputRef, open, autoFocus, onBlur }: SearchInputProps) => {
  return (
    <StyledWrapper>
      <div className="group" data-open={open ? 'true' : undefined}>
        <svg viewBox="0 0 24 24" aria-hidden="true" className="search-icon">
          <g>
            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
          </g>
        </svg>
        <input
          id="query"
          className="input"
          type="search"
          placeholder="Search..."
          name="searchbar"
          ref={inputRef}
          autoFocus={autoFocus}
          onBlur={onBlur}
        />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .group {
    display: flex;
    line-height: 24px;
    align-items: center;
    position: relative;
    width: clamp(400px, 18vw, 190px);
    transition: width 0.25s ease;
  }

  .input {
    font-family: "Montserrat", sans-serif;
    width: 100%;
    height: 40px;
    padding-left: 2.5rem;
    box-shadow: 0 0 0 1.5px #2b2c37, 0 0 25px -17px #000;
    border: 0;
    border-radius: 7px;
    background-color: #16171d;
    outline: none;
    color: #bdbecb;
    transition: all 0.25s cubic-bezier(0.19, 1, 0.22, 1);
    cursor: text;
    z-index: 0;
  }

  .input::placeholder {
    color: #bdbecb;
  }

  .input:hover {
    box-shadow: 0 0 0 2.5px #2f303d, 0px 0px 25px -15px #000;
  }

  .input:active {
    transform: scale(0.95);
  }

  .input:focus {
    box-shadow: 0 0 0 2.5px #2f303d;
  }

  .search-icon {
    position: absolute;
    left: 1rem;
    fill: #bdbecb;
    width: 1rem;
    height: 1rem;
    pointer-events: none;
    z-index: 1;
  }

  @media (max-width: 1024px) {
    .group {
      width: clamp(100px, 22vw, 170px);
    }
  }

  @media (max-width: 640px) {
    .group {
      width: 36px;
    }

    .input {
      width: 36px;
      padding-left: 0;
      background-color: transparent;
      box-shadow: none;
      color: transparent;
      caret-color: #bdbecb;
      border-radius: 7px;
    }

    .input::placeholder {
      color: transparent;
    }

    .search-icon {
      left: 50%;
      transform: translateX(-50%);
    }

    .group:focus-within,
    .group[data-open="true"] {
      position: fixed;
      left: 12px;
      right: 12px;
      top: 15px;
      width: auto;
      z-index: 60;
    }

    .group:focus-within .input,
    .group[data-open="true"] .input {
      width: 100%;
      padding-left: 2.5rem;
      background-color: #16171d;
      box-shadow: 0 0 0 1.5px #2b2c37, 0 0 25px -17px #000;
      color: #bdbecb;
    }

    .group:focus-within .input::placeholder,
    .group[data-open="true"] .input::placeholder {
      color: #bdbecb;
    }

    .group:focus-within .search-icon,
    .group[data-open="true"] .search-icon {
      left: 1rem;
      transform: none;
    }
  }`;

export default SearchInput;
