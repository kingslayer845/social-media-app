import jwt from "jsonwebtoken";

export function verifyJwt(
  token: string,
  secret: string
): Promise<jwt.JwtPayload | undefined | string> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
}
