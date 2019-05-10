const baseUrl = "http://localhost:8080/products";

export const loadStoreProducts = () => {
  return fetch(baseUrl).then(res => res.json());
};
