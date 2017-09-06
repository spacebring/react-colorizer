import styled from "styled-components";
import BarWrapper from "../../../BarWrapper";

export default styled(BarWrapper)`
  background-image: linear-gradient(
    90deg,
    hsl(0, 100%, 50%) 0%,
    hsl(60, 100%, 50%) 17%,
    hsl(120, 100%, 50%) 33%,
    hsl(180, 100%, 50%) 50%,
    hsl(240, 100%, 50%) 67%,
    hsl(300, 100%, 50%) 83%,
    hsl(360, 100%, 50%) 100%
  );
`;
