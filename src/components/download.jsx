import React from 'react';
import styled from 'styled-components';

const Download = () => {
  return (
    <StyledWrapper>
      <a href="/assets/TEMPLATE.xlsx" download>
      <button className="button">
        <span className="button-content">Descarga la Plantilla</span>
      </button>
      </a>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button {
    position: relative;
    overflow: hidden;
    height: 3.2rem;
    padding: 0 1rem;
    border-radius: 10px;
    background: #3d3a4e;
    background-size: 400%;
    color: #fff;
    border: none;
    cursor: pointer;
  }

  .button:hover::before {
    transform: scaleX(1);
  }

  .button-content {
    position: relative;
    z-index: 1;
  }

  .button::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    transform: scaleX(0);
    transform-origin: 0 50%;
    width: 100%;
    height: inherit;
    border-radius: inherit;
    background: linear-gradient(
      82.3deg,
      rgba(150, 93, 233, 1) 10.8%,
      rgba(99, 88, 238, 1) 94.3%
    );
    transition: all 0.475s;
  }`;

export default Download;
