import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'KoPubWorldDotum';
    font-display: swap;
    font-weight: 500;
    src: url('/assets/font/KoPubWorldDotum.woff2') format("woff2");
  }

  @font-face {
    font-family: 'Pretendard';
    font-display: swap;
    font-weight: 500;
    src: url('/assets/font/Pretendard.woff2') format("woff2");
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    -moz-text-size-adjust: none;
    -webkit-text-size-adjust: none;
    text-size-adjust: none;
    font-family: Pretendard;
  }

  ul[role='list'],
  ol[role='list'] {
    list-style: none;
  }

  body {
    margin: 0;
    min-height: 100vh;
    line-height: 1.5;
  }

  h1,
  h2,
  h3,
  h4,
  p,
  button,
  input,
  label {
    line-height: 1.34;
  }

  h1,
  h2,
  h3,
  h4 {
    text-wrap: balance;
    white-space: pre-wrap;
    word-wrap: break-word; /* IE 5.5-7 */
    white-space: -moz-pre-wrap; /* Firefox 1.0-2.0 */
  }

  h1,
  h2,
  h3,
  h4,
  p {
    margin: 0;
    padding: 0;
  }

  a:not([class]) {
    text-decoration-skip-ink: auto;
    color: currentColor;
    text-decoration: none;
  }

  img,
  picture {
    max-width: 100%;
    display: block;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  textarea:not([rows]) {
    min-height: 10em;
  }

  :target {
    scroll-margin-block: 5ex;
  }

  li:hover {
    background-color: #e2e2e2;
  }

  p {
    white-space: pre-wrap;
    word-wrap: break-word; /* IE 5.5-7 */
    white-space: -moz-pre-wrap; /* Firefox 1.0-2.0 */
  }

  .ql-align-center {
    text-align: center;
  }

  .ql-align-right {
    text-align: right;
  }

  .ql-align-justify {
    text-align: justify;
  }

  blockquote {
    border-left: 4px solid #ccc;
    margin-bottom: 5px;
    margin-top: 5px;
    padding-left: 16px;
  }

  .ql-editor {
    background-color: white;
    height: 70vh;
  }

`;
