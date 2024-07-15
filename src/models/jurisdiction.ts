import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';

interface JurisdictionAttributes {
  id: number;
  UserFeeShare: number;
  tax: number;
  discount: object;
  buy_margin: number;
  sell_margin: number;
  FassetFee: number;
  dinariConstantFee: number;
  dinariPercentageFee: number;
}

interface JurisdictionCreationAttributes extends Optional<JurisdictionAttributes, 'id'> {}

class Jurisdiction extends Model<JurisdictionAttributes, JurisdictionCreationAttributes>
  implements JurisdictionAttributes {
  public id!: number;
  public UserFeeShare!: number;
  public tax!: number;
  public discount!: object;
  public buy_margin!: number;
  public sell_margin!: number;
  public FassetFee!: number;
  public dinariConstantFee!: number;
  public dinariPercentageFee!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Jurisdiction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    UserFeeShare: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    tax: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    discount: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    buy_margin: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    sell_margin: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    FassetFee: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    dinariConstantFee: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    dinariPercentageFee: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Jurisdiction',
    timestamps: true,
  }
);

export default Jurisdiction;
