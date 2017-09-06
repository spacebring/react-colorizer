import styled from "styled-components";
import BarWrapper from "../../../BarWrapper";

export default styled(BarWrapper).attrs({
  style: props => ({
    backgroundImage: `linear-gradient(
      90deg,
      hsl(${props.hue}, ${props.saturationPercent}%, 100%) 0%, 
      hsl(${props.hue}, ${props.saturationPercent}%, 50%) 50%, 
      hsl(${props.hue}, ${props.saturationPercent}%, 0%) 100%
    )`
  })
})``;
