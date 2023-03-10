import { readdirSync, readFileSync } from 'node:fs';

import ExifParser from 'exif-parser';

function getPictureDimensions(picture) {
  const buffer = readFileSync(picture);
  const parser = ExifParser.create(buffer);
  const exifData = parser.parse();
  const width = exifData.imageSize.width;
  const height = exifData.imageSize.height;
  return { width, height };
}

export default async function getPhotoObjectsArray(paths) {
  const fileNames = readdirSync(paths.fullPath);
  const dimensions = await Promise.all(
    fileNames.map((image) => {
      return getPictureDimensions(`${paths.fullPath}/${image}`);
    }),
  );
  return fileNames.map((fileName, index) => {
    return {
      src: paths.shortenedPath + fileName,
      width: dimensions[index].width,
      height: dimensions[index].height,
    };
  })
}
