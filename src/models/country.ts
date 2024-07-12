import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db'; // Adjust the path as necessary

class Country extends Model {
  public country_id!: number;
  public country_UserFeeShare!: number;
  public country_tax!: number;
  public country_discount!: object;
  public country_buy_margin!: number;
  public country_sell_margin!: number;
  public country_FassetFee!: number;
  public country_dinariConstantFee!: number;
  public country_dinariPercentageFee!: number;
}

Country.init(
  {
    country_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    country_UserFeeShare: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    country_tax: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    country_discount: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    country_buy_margin: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    country_sell_margin: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    country_FassetFee: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    country_dinariConstantFee: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    country_dinariPercentageFee: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'Country',
    timestamps: true,
  }
);

export default Country;
