module.exports = {
  app: {
    name: "MERN App",
    apiEndpoint: (process.env.API_URL) ? `/${process.env.API_URL}` : '/api',
  },
  database: {
    url: 'mongodb+srv://gametraker:gametrak@cluster0.n8pt6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' || 'mongodb://localhost:27017/MERNApp', // for local mongodb
    // url: "PUT-YOUR-MONGODB-CONNECTION-STRING-HERE" // for mongodb atlas, comment the above line, uncomment this line, and add your connection string.
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'jwt-secret',
    tokenLife: '7d',
  },
}
