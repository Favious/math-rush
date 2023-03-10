import React, { useState } from "react";
import styled from "styled-components";

export default function Calculator() {
  return (
    <Calc>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button>0</button>
      <button>{"<-"}</button>
    </Calc>
  );
}

const Calc = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 50%;
  gap: 0.5rem;
  font-family: var(--font-space);
  button {
    font-size: 1.7rem;
    flex: 1 1 30%;
    padding: 0.7rem;
    user-select: none;
  }
`;
