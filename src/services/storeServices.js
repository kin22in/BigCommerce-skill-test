const baseUrl = "http://localhost:8080/products";

export const loadStoreProducts = async () => {
  const res = await fetch(baseUrl);
  return res.json();
};
