const http = require('http');
const app = require('./app');
const server = http.createServer(app);
const errorMiddleware = require('./middlewares/Error')
const User = require('./models/modalsArquella')
const CareGroup = require('./models/careGroupModel')
const CareHome = require('./models/careHomeModel')
const RefreshToken = require('./models/refreshTokenModel')
const CallModel = require('./models/callModels/callModel');


const sequelize = require('./DataBase/dataBase')



User.hasOne(CareGroup, {
  foreignKey: "applicationUsers_id"
});

CareGroup.belongsTo(User, {
  foreignKey: 'applicationUsers_id'
});

CareGroup.hasMany(CareHome, {
  foreignKey: "careGroup_id"
})

CareHome.hasMany(CallModel , {as: 'callHistory',
  foreignKey: 'careHome_id'
});

// CareHome.belongsTo(CallModel, {
//   foreignKey: 'careHome_id'
// });


//  User.sync({ force: true })
//  CareGroup.sync({ force: true })
//  CareHome.sync({ force: true })
//  CallModel.sync({ force: false })     
//  RefreshToken.sync({ force: true })


 sequelize
 .sync({ force: true }) // Set force to true to drop existing tables (Caution: this will delete data)
 .then(() => {
   // Association order matters, make sure to sync models in the correct order
   return User.sync();
 })
 .then(() => {
   return CareGroup.sync();
 })
 .then(() => {
   return CareHome.sync();
 })
 .then(() => {
  return CallModel.sync();
})
.then(() => {
  return RefreshToken.sync();
})
 .then(() => {
   // Start the Express app
   server.listen(process.env.PORT, console.log('server is started at 3007'))
   app.use(errorMiddleware)
  
 })
 .catch((error) => {
   console.error('Unable to synchronize Sequelize models:', error);
 });




