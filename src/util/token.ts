import jwt from "jsonwebtoken";
export async function generateToken(user: User) {
  return jwt.sign(
    {
      sub: user.id,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    },
    "secret"
  );
}

export async function verifyToken(token: string) {
  return jwt.verify(token, "secret");
}
