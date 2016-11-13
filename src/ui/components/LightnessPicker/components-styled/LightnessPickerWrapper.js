import styled from 'styled-components';
import BarWrapper from '../../BarWrapper';
import { COLOR_PICKER_GRADIENT_WEB } from '../../../utils/styles';

export default styled(BarWrapper)`
  ${COLOR_PICKER_GRADIENT_WEB}
  height: ${props => props.height}px;
  background-image: linear-gradient(90deg,
    hsl(${props => props.hue}, ${props => props.saturationPercent}%, 100%) 0%, 
    hsl(${props => props.hue}, ${props => props.saturationPercent}%, 50%) 50%, 
    hsl(${props => props.hue}, ${props => props.saturationPercent}%, 0%) 100%
  );
  width: ${props => props.width}px;
`;
