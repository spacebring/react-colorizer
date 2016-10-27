import styled from 'styled-components/native';

export default halfSize => (
  styled.View`
    align-items: center;
    border-radius: ${halfSize};
    flex: 1;
    justify-content: center;
    position: absolute;
    margin-left: 0;
  `
);

/*
border-radius: 50%;
*/
