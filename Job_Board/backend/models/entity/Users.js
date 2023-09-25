module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      UserID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
      },
      FullName: {
        type: DataTypes.STRING,
      },
      Email: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      Password: {
        type: DataTypes.STRING,
      },
      MobileNumber: {
        type: DataTypes.STRING,
      },
      DOB: {
        type: DataTypes.DATE,
      },
      ExpectedLPA: {
        type: DataTypes.FLOAT,
      },
      InterestedRole: {
        type: DataTypes.STRING,
      },
      Skills: {
        type: DataTypes.STRING,
      },
      Experience: {
        type: DataTypes.INTEGER,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isActivated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }
  );
  return Users
}
