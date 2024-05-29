import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config';
import Habitat from './HabitatModel';
import Alimentacao from './AlimentacaoModel';

const Animal = sequelize.define(
  'animal',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.CHAR(50),
      allowNull: false,
    },
    especie: {
      type: DataTypes.CHAR(50),
      allowNull: false,
    },
    cor: {
      type: DataTypes.CHAR(20),
      allowNull: false,
    },
    numIdentificacao: {
      field: 'num_identificacao',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },

);

Animal.belongsTo(Habitat, {
  as: 'habitat',
  onDelete: 'no action',
  onUpdate: 'no action',
  foreignKey: {
    field: 'id_habitat',
    name: 'idHabitat',
    allowNull: false,
  },
});

Animal.belongsTo(Alimentacao, {
  as: 'alimentacao',
  onDelete: 'no action',
  onUpdate: 'no action',
  foreignKey: {
    field: 'id_alimentacao',
    name: 'idAlimentacao',
    allowNull: false,
  },
});

export default Animal;
