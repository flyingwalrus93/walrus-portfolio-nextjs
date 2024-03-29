import { css } from '@emotion/react';
import Head from 'next/head';

const aboutStyles = css`
  padding-top: 3%;
  p {
    padding-left: 20%;
    padding-right: 20%;
    padding-bottom: 10%;
    text-align: justify;
  }
  img {
    width: 20%;
    padding-top: 5%;
    padding-bottom: 5%;
    max-width: 350px;
    pointer-events: none;
  }
  @media only screen and (max-width: 1080px) {
    p {
      padding-left: 10%;
      padding-right: 10%;
      padding-bottom: 10%;
      text-align: justify;
    }
    img {
      width: 30%;
      padding-top: 5%;
      padding-bottom: 5%;
      max-width: 350px;
      pointer-events: none;
    }
  }
`;

export default function About() {
  return (
    <>
      <Head>
        <title>Welcome!</title>
        <meta name="description" content="About" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main css={aboutStyles}>
        <h1>About</h1>
        <img src="/about.jpg" alt="Home" />
        <p>
          Hi there, I'm Lukas :)
          <br />I like to take pictures of all sorts of things in my free time.
          On this page you can find a small selection. While my output
          is predominantly digital, I capture a growing number of pictures on
          analogue film. I shot Fuji, Canon and Contax cameras. If you have any questions, feel free to drop me a line.
          <br />
          <br />
          <i>
            All images are mine and all rights are reserved. Do not use without
            permission.
          </i>
        </p>
      </main>
    </>
  );
}
