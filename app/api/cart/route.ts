import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch(`${process.env.DJANGO_API_URL}/cart/`, {
    headers: {
      Authorization: `Bearer ${req.cookies.access_token}`, // Add authentication
    },
  });
  const data = await response.json();
  res.status(response.status).json(data);
}
