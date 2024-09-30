import https from "./config";
const products = {
    create: (data) => https.get(`products/create/`,data),
    get: () => https.get("/products/search"),
    update: (id, data) => https.patch(`/products/update/${id}`, data),
    delete: (id) => https.delete(`/products/delete/${id}`),
};

export default products;