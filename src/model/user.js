import { Sequelize, Model, DataTypes } from "sequelize";

const sequelize = new Sequelize({
    dialect:'sqlite',
    storage:'./db.sqlite'
});

//creation du model utilisteur
class User extends Model{}
User.init( {
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    password: DataTypes.STRING,
    photo: DataTypes.TEXT,
    role: DataTypes.STRING,
    status: {
      type:DataTypes.BOOLEAN,
      defaultValue:true
    },
    cookie: DataTypes.TEXT
  }, {sequelize, modelName: 'user'} );

await sequelize.sync();

export default User

