module.exports = (sequelize, DataTypes) => {
  const Applications = sequelize.define(
    'Applications',
    {
      ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      UserId: {
        type: DataTypes.INTEGER,
      },
      JobCreatedBy: {
        type: DataTypes.INTEGER,
      },
      CompanyName: {
        type: DataTypes.STRING,
      },
      UserName: {
        type: DataTypes.STRING,
      },
      UserEmail: {
        type: DataTypes.STRING,
      },
      JobID: {
        type: DataTypes.INTEGER,
      },
      JobTitle: {
        type: DataTypes.STRING,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
  );

  return Applications;
}
