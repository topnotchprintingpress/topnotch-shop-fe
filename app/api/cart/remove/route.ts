import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "DELETE") {
    const response = await fetch(
      `${process.env.DJANGO_API_URL}/cart/items/${id}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${req.cookies.access_token}`,
        },
      }
    );
    res.status(response.status).end();
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
