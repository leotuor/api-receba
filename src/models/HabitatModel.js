import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config';
import Visitas from './VisitasModel';

const Habitat = sequelize.define(
  'habitat',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tipo: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lotacaoMax: {
      field: 'lotacao_max',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantidadeAnimais: {
      field: 'quantidade_animais',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    numeroHabitat: {
      field: 'numero',
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

Habitat.belongsTo(Visitas, {
  as: 'visitas',
  onDelete: 'no action',
  onUpdate: 'no action',
  foreignKey: {
    field: 'id_visitas',
    name: 'idVisitas',
    allowNull: false,
  },
});

export default Habitat;
