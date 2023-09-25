module.exports = (sequelize, DataTypes) => {
  const Jobs = sequelize.define(
    'Jobs',
    {
      CompanyName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      CreatedBy: {
        type: DataTypes.STRING,
      },
      JobID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
      },
      JobTitle: {
        type: DataTypes.STRING,
      },
      Package: {
        type: DataTypes.STRING,
      },
      JobDescription: {
        type: DataTypes.TEXT,
      },
      RequiredSkills: {
        type: DataTypes.STRING,
      },
      RequiredEducation: {
        type: DataTypes.STRING,
      },
      RequiredExperience: {
        type: DataTypes.INTEGER,
      },
      Location: {
        type: DataTypes.STRING,
      },
    }
  );
  return Jobs
}
