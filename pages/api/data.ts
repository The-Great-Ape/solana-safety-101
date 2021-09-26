// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Data from "./data.json";

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  res.status(200).json(Data);
}
