import styled from 'styled-components';
import BarWrapper from '../../BarWrapper';
import { COLOR_PICKER_GRADIENT_WEB } from '../../../utils/styles';

export default styled(BarWrapper)`
  ${COLOR_PICKER_GRADIENT_WEB}
  height: ${props => props.height}px;
  backgroundImage: linear-gradient(
    90deg, hsl(${props => props.hue}, 0%, 50%) 0%, hsl(${props => props.hue}, 100%, 50%) 100%
  );
  width: ${props => props.width}px;
`;
