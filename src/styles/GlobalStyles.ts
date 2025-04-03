import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }
  
  html {
    font-size: 16px;
  }
  
  body
{
  margin: 0
  padding: 0
  font - family
  : 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
  ;-webkit - font - smoothing
  : antialiased
  ;-moz - osx - font - smoothing
  : grayscale
  background - color
  : $
  ;({ theme }) => theme.colors.background
  color: $
  ;({ theme }) => theme.colors.text
  transition: background - color
  0.3s ease, color 0.3s ease
}

  
  h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    font-weight: 700;
    line-height: 1.2;
    color: ${({ theme }) => theme.colors.heading};
  }
  
  p {
    margin-top: 0;
    line-height: 1.6;
  }
  
  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
  
  button, input, select, textarea {
    font-family: inherit;
  }
  
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
  
  /* Utility classes */
  .text-center {
    text-align: center;
  }
  
  .mb-1 {
    margin-bottom: 0.25rem;
  }
  
  .mb-2 {
    margin-bottom: 0.5rem;
  }
  
  .mb-3 {
    margin-bottom: 1rem;
  }
  
  .mb-4 {
    margin-bottom: 1.5rem;
  }
  
  .mb-5 {
    margin-bottom: 3rem;
  }
  
  .mt-1 {
    margin-top: 0.25rem;
  }
  
  .mt-2 {
    margin-top: 0.5rem;
  }
  
  .mt-3 {
    margin-top: 1rem;
  }
  
  .mt-4 {
    margin-top: 1.5rem;
  }
  
  .mt-5 {
    margin-top: 3rem;
  }
`;

export default GlobalStyles;