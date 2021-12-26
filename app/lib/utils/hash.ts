import MD5 from "md5";

// double hashing because why not 🤟
export function hash(text: string): string {
  const hashedText = MD5(text);
  return MD5(hashedText + process.env.SALT)
}