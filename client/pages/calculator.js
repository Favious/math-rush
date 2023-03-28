import Calculator from "@/components/Calculator";
import StatusBar from "@/components/StatusBar";
import Operation from "@/components/Operation";
import styled from "styled-components";

export default function MockPlay() {
  return (
    <Mock>
      <Operation />
      <StatusBar />
      <Calculator />
    </Mock>
  );
}

const Mock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;
