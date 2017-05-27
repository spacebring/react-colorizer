import styled from 'styled-components';
import BarWrapperWeb from '../../../../components-styled/BarWrapper.web';

export default styled(BarWrapperWeb).attrs({
  style: props => ({
    backgroundImage: `linear-gradient(
      90deg,
      hsl(${props.hue}, ${props.saturationPercent}%, 100%) 0%, 
      hsl(${props.hue}, ${props.saturationPercent}%, 50%) 50%, 
      hsl(${props.hue}, ${props.saturationPercent}%, 0%) 100%
    )`,
  }),
})``;
