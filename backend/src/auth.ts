import dotenv from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
dotenv.config();

interface JwtPayloadWithId extends JwtPayload {
  id: string;
}
export const auth = (req: Request, res: Response, next: NextFunction) => {
  console.log("befoer token");
  const token = req.headers["authorization"];
  console.log("after token ");
  const decodedToken = jwt.verify(
    token as string,
    process.env.SECRET as string
  ) as JwtPayloadWithId;
  console.log("after decodedtoken", decodedToken);

  if (decodedToken) {
    req.userId = decodedToken.id;
    next();
  } else {
    res.status(400).json({
      warning: "you are not logged in",
    });
  }
};
