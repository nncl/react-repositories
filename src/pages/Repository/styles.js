import styled from 'styled-components';

export const Loading = styled.h1`
  color: #fff;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }
  img {
    max-width: 120px;
    border-radius: 50%;
    margin-top: 30px;
  }
  h1 {
    font-size: 24px;
    margin-top: 10px;
  }
  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;
