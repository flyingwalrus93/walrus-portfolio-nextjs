import { existsSync } from 'node:fs';

import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';

import PhotoGallery from '../../Components/PhotoGallery';
import getPhotoObjectsArray, { Photos } from '../../utils/getPhotoObjects';

type Props =
  | {
      photos: Photos[];
      pageName: string;
    }
  | {
      error: string;
    };

const imageStyles = css`
  div {
    padding: 12px;
    margin: 12px;
  }
  h1 {
    margin-top: 24px;
    font-size: 36px;
  }
  img {
    padding: 0.25em;
  }
`;

export default function PictureGallery(props: Props) {
  useEffect(() => {
    const handleContextmenu = (e: any) => {
      e.preventDefault();
    };
    document.addEventListener('contextmenu', handleContextmenu);
    return function cleanup() {
      document.removeEventListener('contextmenu', handleContextmenu);
    };
  }, []);
  if ('error' in props) {
    return (
      <>
        <Head>
          <meta name="description" content="No pictures found" />
          <title>No pictures found!</title>
        </Head>
        <div>
          <h3>{props.error}</h3>
          <p>
            Hey, it looks like you stumbled into here. No worries,{' '}
            <Link href="/pictures">here</Link> you can find more beautiful
            pictures.
          </p>
        </div>
      </>
    );
  }
  return (
    <>
      <Head>
        <meta
          name="description"
          content={`Display of photographs by Lukas Hahn with the theme ${props.pageName}`}
        />
        <title>
          {props.pageName.slice(0, 1).toUpperCase() + props.pageName.slice(1)}{' '}
          Photography
        </title>
      </Head>
      <div css={imageStyles}>
        {props.pageName ? (
          <h1>
            {props.pageName.slice(0, 1).toUpperCase() + props.pageName.slice(1)}{' '}
            Photography
          </h1>
        ) : null}
        <PhotoGallery photos={props.photos} />
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const pageName = context.query.name;
  const paths = {
    fullPath: `./public/img/${pageName}`,
    shortenedPath: `/img/${pageName}/`,
  };
  const directoryExists = existsSync(paths.fullPath);
  if (!directoryExists) {
    context.res.statusCode = 404;
    return {
      props: {
        error: 'Sorry, there are no pictures here!',
      },
    };
  }
  const photos = await getPhotoObjectsArray(paths);
  return {
    props: {
      photos: photos,
      pageName: pageName,
    },
  };
}