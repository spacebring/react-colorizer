import styled from 'styled-components';
import BarWrapper from '../../../BarWrapper';
import { COLOR_PICKER_GRADIENT_WEB } from '../../../../utils/styles';

export default styled(BarWrapper)`
  ${COLOR_PICKER_GRADIENT_WEB}
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
  height: ${props => props.height}px;
  width: ${props => props.width}px;
`;
