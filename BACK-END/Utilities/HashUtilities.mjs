import * as bcrypt from "bcrypt";
import * as crypto from "crypto";

/* ---- USING BCRYPT ---- */
export async function GenerateHash (plainText) {
  const salt = bcrypt.genSaltSync(10);
  const hashed = bcrypt.hashSync(plainText, salt);
  return hashed;
}

export async function CompareHash(plainText, hashed) {
  return bcrypt.compareSync(plainText, hashed);
}

/* ---- USING CRYPTO ---- */
export async function generateHash(plainText) {
  const hash = crypto.createHash('sha256').update(plainText).digest('hex');
  console.log(hash);
  return hash;
}

export async function compareHash(plainText, hashed) {
  const hash = crypto.createHash('sha256').update(plainText).digest('hex');
  return hash === hashed;
}