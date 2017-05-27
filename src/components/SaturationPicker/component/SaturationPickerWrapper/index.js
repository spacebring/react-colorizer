import styled from 'styled-components';
import BarWrapperWeb from '../../../../components-styled/BarWrapper.web';

export default styled(BarWrapperWeb).attrs({
  style: props => ({
    backgroundImage: `linear-gradient(
      90deg, hsl(${props.hue}, 0%, 50%) 0%, hsl(${props.hue}, 100%, 50%) 100%
    )`,
  }),
})``;
