import Strapi from 'strapi-sdk-javascript/build/main';

const apiUrl = process.env.BACKEND_URL;
const strapi = new Strapi(apiUrl);

export default strapi;
export { apiUrl };
