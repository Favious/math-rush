import Calculator from "@/components/Calculator";
import styled from "styled-components";

export default function MockPlay() {
  return (
    <Mock>
      <Calculator />
    </Mock>
  );
}

const Mock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
