/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "Ayayay Impuestos";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Font
// const interSemiBold = fetch(new URL("./Inter.ttf", import.meta.url)).then(res =>
//   res.arrayBuffer()
// );

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 128,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          background: "#facc15"
        }}
      >
        <img
          src="https://res.cloudinary.com/dr8sgdcgz/image/upload/v1736037621/ayayay-impuestos/n7eqhahp4t4v1um17dyl.svg"
          alt={alt}
          width={1000}
          height={340}
        />
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size
      // fonts: [
      //   {
      //     name: "Inter",
      //     data: await interSemiBold,
      //     style: "normal",
      //     weight: 400
      //   }
      // ]
    }
  );
}
