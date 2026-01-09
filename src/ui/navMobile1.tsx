"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { IoChatbubblesSharp, IoHomeOutline } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { AiOutlineSetting } from "react-icons/ai";
import { FcSearch } from "react-icons/fc";

import SearchInput from "@/src/components/searchInput";

type NavItem = {
  key: string;
  label: string;
  type: "link" | "search";
  href?: string;
  icon: React.ReactNode;
};

const ITEMS: NavItem[] = [
  { key: "home", label: "Trang chu", type: "link", href: "/", icon: <IoHomeOutline className="icon" /> },
  {
    key: "friends",
    label: "Ban be",
    type: "link",
    href: "/friends",
    icon: <FaUserFriends className="icon" />,
  },
  { key: "search", label: "Tim kiem", type: "search", icon: <FcSearch className="icon" /> },
  {
    key: "chat",
    label: "Nhan tin",
    type: "link",
    href: "/chat",
    icon: <IoChatbubblesSharp className="icon" />,
  },
  {
    key: "settings",
    label: "Cai dat",
    type: "link",
    href: "/settings",
    icon: <AiOutlineSetting className="icon" />,
  },
];

const SEARCH_INDEX = ITEMS.findIndex((item) => item.type === "search");

const Switch = () => {
  const pathname = usePathname();
  const [isSearchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isSearchOpen) {
      return undefined;
    }
    const timeoutId = window.setTimeout(() => {
      searchInputRef.current?.focus();
    }, 0);
    return () => window.clearTimeout(timeoutId);
  }, [isSearchOpen]);

  useEffect(() => {
    setSearchOpen(false);
  }, [pathname]);

  const activeIndex = useMemo(() => {
    if (isSearchOpen && SEARCH_INDEX >= 0) {
      return SEARCH_INDEX;
    }
    const index = ITEMS.findIndex((item) => {
      if (item.type !== "link" || !item.href) {
        return false;
      }
      return item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);
    });
    return index >= 0 ? index : 0;
  }, [pathname, isSearchOpen]);

  const handleSearchToggle = () => {
    setSearchOpen((prev) => !prev);
  };

  const handleSearchBlur = () => {
    setSearchOpen(false);
  };

  return (
    <StyledWrapper $count={ITEMS.length}>
      <div className="cyber-signboard">
        <div className="cyber-switch">
          {ITEMS.map((item, index) => {
            const inputId = `cyber-opt-${index + 1}`;
            const isActive = activeIndex === index;

            if (item.type === "search") {
              return (
                <React.Fragment key={item.key}>
                  <input type="radio" id={inputId} name="cyber-mode" checked={isActive} readOnly />
                  <label htmlFor={inputId} className="cyber-label">
                    <button
                      type="button"
                      className="cyber-button"
                      aria-label={item.label}
                      aria-expanded={isSearchOpen}
                      onClick={handleSearchToggle}
                    >
                      {item.icon}
                      <span className="glare" />
                    </button>
                  </label>
                </React.Fragment>
              );
            }

            return (
              <React.Fragment key={item.key}>
                <input type="radio" id={inputId} name="cyber-mode" checked={isActive} readOnly />
                <label htmlFor={inputId} className="cyber-label">
                  <Link
                    href={item.href ?? "/"}
                    className="cyber-link"
                    aria-label={item.label}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setSearchOpen(false)}
                  >
                    {item.icon}
                    <span className="glare" />
                  </Link>
                </label>
              </React.Fragment>
            );
          })}
          <div className="cyber-highlight">
            <div className="highlight-inner" />
          </div>
        </div>
      </div>

      {isSearchOpen ? (
        <SearchInput
          inputRef={searchInputRef}
          open={isSearchOpen}
          autoFocus
          onBlur={handleSearchBlur}
        />
      ) : null}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div<{ $count: number }>`
  /* Container Layout */
  .cyber-signboard {
    /* System Design Variables */
    --primary-glow: #00f0ff;
    --secondary-glow: #7000ff;
    --inactive-color: #5c6b7f;
    --bg-dark: #0f1016;
    --switch-width: min(520px, calc(100vw - 24px));
    --switch-height: 60px;
    --padding: 5px;
    --count: ${({ $count }) => $count};
    --radius: calc(var(--switch-height) * 0.25);
    --inner-radius: calc(var(--switch-height) * 0.175);
    --icon-size: calc(var(--switch-height) * 0.35);

    --item-width: calc((var(--switch-width) - (var(--padding) * 2)) / var(--count));

    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 12px;
    box-sizing: border-box;
    font-family: sans-serif;
  }

  .cyber-switch {
    position: relative;
    width: var(--switch-width);
    height: var(--switch-height);
    background: var(--bg-dark);
    border-radius: var(--radius);
    box-shadow:
      inset 0 2px 4px rgba(0, 0, 0, 0.8),
      inset 0 -1px 2px rgba(255, 255, 255, 0.05),
      0 20px 40px -10px rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    padding: var(--padding);
    margin: 0 auto;
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
    border-radius: var(--inner-radius);
    transition: all 0.3s ease;
    -webkit-tap-highlight-color: transparent;
  }

  .cyber-link,
  .cyber-button {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    border: 0;
    padding: 0;
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  /* Icons Style */
  .cyber-label .icon {
    width: var(--icon-size);
    height: var(--icon-size);
    color: var(--inactive-color);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5));
  }

  /* The Sliding Highlight */
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
    border-radius: var(--inner-radius);
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

  /* Interaction Logic */
  /* State 1 */
  #cyber-opt-1:checked ~ .cyber-highlight {
    transform: translateX(0%);
  }
  #cyber-opt-1:checked ~ [for="cyber-opt-1"] .icon {
    color: #fff;
    filter: drop-shadow(0 0 8px var(--primary-glow));
    transform: scale(1.1);
  }

  /* State 2 */
  #cyber-opt-2:checked ~ .cyber-highlight {
    transform: translateX(100%);
  }
  #cyber-opt-2:checked ~ [for="cyber-opt-2"] .icon {
    color: #fff;
    filter: drop-shadow(0 0 8px var(--primary-glow));
    transform: scale(1.1);
  }

  /* State 3 */
  #cyber-opt-3:checked ~ .cyber-highlight {
    transform: translateX(200%);
  }
  #cyber-opt-3:checked ~ [for="cyber-opt-3"] .icon {
    color: #fff;
    filter: drop-shadow(0 0 8px var(--primary-glow));
    transform: scale(1.1);
  }

  /* State 4 */
  #cyber-opt-4:checked ~ .cyber-highlight {
    transform: translateX(300%);
  }
  #cyber-opt-4:checked ~ [for="cyber-opt-4"] .icon {
    color: #fff;
    filter: drop-shadow(0 0 8px var(--primary-glow));
    transform: scale(1.1);
  }

  /* State 5 */
  #cyber-opt-5:checked ~ .cyber-highlight {
    transform: translateX(400%);
  }
  #cyber-opt-5:checked ~ [for="cyber-opt-5"] .icon {
    color: #fff;
    filter: drop-shadow(0 0 8px var(--primary-glow));
    transform: scale(1.1);
  }

  /* Focus States for Accessibility */
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
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: var(--inner-radius);
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

  .highlight-inner {
    animation: neon-pulse 3s infinite ease-in-out;
  }
`;

export default Switch;
