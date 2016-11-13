import styled from 'styled-components';
import BarWrapper from '../../BarWrapper';
import { COLOR_PICKER_GRADIENT_WEB } from '../../../utils/styles';

export default styled(BarWrapper)`
  ${COLOR_PICKER_GRADIENT_WEB}
  height: ${props => props.height}px;
  width: ${props => props.width}px;
`;
