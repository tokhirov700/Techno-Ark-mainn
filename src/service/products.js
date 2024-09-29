import https from "./config";
const products = {
    get: () => https.get("/products/search"),

};

export default products;
