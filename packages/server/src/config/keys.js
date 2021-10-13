module.exports = {
  app: {
    name: "MERN App",
    apiEndpoint: (process.env.API_URL) ? `/${process.env.API_URL}` : '/api',
  },
  database: {
    url: process.env.MONGODB_URI ||'mongodb+srv://gametraker:gametrak@cluster0.n8pt6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' , // for local mongodb
    // url: "PUT-YOUR-MONGODB-CONNECTION-STRING-HERE" // for mongodb atlas, comment the above line, uncomment this line, and add your connection string.
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'jwt-secret',
    tokenLife: '7d',
  },
}
