export default (url) => (url ? `${process.env.BACKEND_URL}${url}` : '');
