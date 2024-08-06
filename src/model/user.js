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
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    photo: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
  }, {sequelize, modelName: 'user'} );

await sequelize.sync();

export default User

