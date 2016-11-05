import styled from 'styled-components/native';

export default halfSize => (
  styled.View`
    border-color: white;
    border-style: solid;
    border-width: 2;
    border-radius: ${halfSize};
  `
);
