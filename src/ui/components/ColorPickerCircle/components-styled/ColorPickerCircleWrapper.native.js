import styled from 'styled-components/native';

export default halfSize => (
  styled.View`
    align-items: center;
    border-radius: ${halfSize};
    justify-content: center;
    position: absolute;
    margin-left: 0;
  `
);
