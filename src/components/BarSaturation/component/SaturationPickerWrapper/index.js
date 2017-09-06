import styled from "styled-components";
import BarWrapper from "../../../BarWrapper";

export default styled(BarWrapper).attrs({
  style: props => ({
    backgroundImage: `linear-gradient(
      90deg, hsl(${props.hue}, 0%, 50%) 0%, hsl(${props.hue}, 100%, 50%) 100%
    )`
  })
})``;
