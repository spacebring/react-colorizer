import styled from 'styled-components/native';

export default styled.View.attrs({
  style: props => ({
    borderRadius: props.size / 2,
    height: props.size / 2,
    width: props.size / 2,
  }),
})`
  border-color: white;
  border-style: solid;
  border-width: 2;
`;
