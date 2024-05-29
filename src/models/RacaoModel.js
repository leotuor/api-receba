import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config';

const Racao = sequelize.define(
  'racao',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tipo: {
      type: DataTypes.STRING(50),
    },
    quantEstoque: {
      field: 'quant_estoque',
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },

);

export default Racao;
