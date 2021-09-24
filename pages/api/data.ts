// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import DummyData from "./dummy-data.json";

type Data = {
  domain?: string | undefined;
  status?: string | undefined;
  spacing?: boolean | undefined;
}[];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json(DummyData);
}
