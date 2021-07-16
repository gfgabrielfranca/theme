import styled from 'styled-components';

export const Links = styled.div`
  display: flex;
  align-items: center;
  
  a {
    padding: 3px 8px;
    color: gray;
    border: 1px solid gray;
    text-decoration: none;
  }

  .active {
    font-weight: bolder;
    background: gray;
    color: white;
    
  }
`

export const Inputs = styled.div`
  margin: 12px 0;

  > div + div {
    margin-top: 8px;
  }
`