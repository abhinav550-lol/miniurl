import {memClient} from "../config/mem.js";

export async function setCacheData(key, value, expiry) {
  await memClient.set(
    key,
    JSON.stringify(value),
    { expires: expiry }
  );
}

export async function getCacheData(key) {
  const { value } = await memClient.get(key);

  if (!value) {
    return null;
  }

  return JSON.parse(value.toString());
}

export async function deleteCacheData(key) {
  await memClient.delete(key);
}