// import { NextApiRequest, NextApiResponse } from "next";

// const SEO = {
//   description: "Gitfrens",
//   title: "Gitfrens",
// };
// export function sanitizeId(str = "") {
//   return str.replace(/[^a-zA-Z0-9]/g, "");
// }

// function getImageUrl(query: any) {
//   const id = sanitizeId(query.id);
//   const version = sanitizeId(query.version);
//   const folderName = "NFT";
//   const baseUrl = `https://res.cloudinary.com/dxgjl20yb/image/upload/v${version}`;
//   return `${baseUrl}/${folderName}/${id}.png`;
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "GET") {
//     try {
//       const { query } = req;
//       const imageUrl = getImageUrl(query);
//       const rootRedirectURL = "https://githubfrens.vercel.app/";
//       const html = `
//         <!doctype html>
//         <html lang="en">
//         <head>
//         <meta charset="utf-8" />
//         <meta name="viewport" content="width=device-width,initial-scale=1" />
//         <meta name="title" content="${SEO.title}" />
//         <meta name="description" content="${SEO.description}" />
//         <meta property="og:locale" content="en_US" />
//         <meta property="og:image:type" content="image/png" />
//         <meta property="og:url" content="${imageUrl}" />
//         <meta property="og:site_name" content="PEAR" />
//         <meta property="og:title" content="${SEO.title}" />
//         <meta property="og:description" content="${SEO.description}" />
//         <meta property="og:image" content="${imageUrl}" />
//         <meta property="og:image:width" content="398" />
//         <meta property="og:image:height" content="477" />
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:description" content="${SEO.description}" />
//         <meta name="twitter:title" content="${SEO.title}" />
//         <meta name="twitter:image" content="${imageUrl}" />
//         <meta property="og:image" content="${imageUrl}" />
//         <meta property="og:image:type" content="image/png" />
//         <meta property="og:image:width" content="398" />
//         <meta property="og:image:height" content="477" />
//         </head>
//         <body>
//         </body>
//         <script>
//           setTimeout(() => {
//               window.location.href = "${rootRedirectURL}"
//           }, 100);
//         </script>
//         </html>
//       `;

//       return res
//         .status(200)
//         .setHeader("Content-Type", "text/html")
//         .setHeader("Cache-Control", "no-cache, no-store, must-revalidate")
//         .send(html);
//     } catch (e: any) {
//       console.log(e);

//       res.status(500).json({ error: e });
//     }
//   } else {
//     res.status(405).json({ error: "Only POST method is allowed" });
//   }
// }
