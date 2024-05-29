import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config';
import Usuario from './UsuarioModel';
import LogAlimentacao from './LogAlimentacaoModel';
import Racao from './RacaoModel';

const Alimentacao = sequelize.define(
  'alimentacao',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantidadeDiaria: {
      field: 'quantidade_diaria',
      type: DataTypes.STRING(75),
    },
    horario1: {
      type: DataTypes.STRING,
    },
    horario2: {
      type: DataTypes.STRING,
    },
    horario3: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);

Alimentacao.belongsTo(Usuario, {
  as: 'usuario',
  onDelete: 'no action',
  onUpdate: 'no action',
  foreignKey: {
    field: 'id_usuario',
    name: 'idUsuario',
    allowNull: false,
  },
});
Alimentacao.belongsTo(LogAlimentacao, {
  as: 'log_alimentacao',
  onDelete: 'no action',
  onUpdate: 'no action',
  foreignKey: {
    field: 'id_log_alimentacao',
    name: 'idLogAlimentacao',
    allowNull: false,
  },
});
Alimentacao.belongsTo(Racao, {
  as: 'racao',
  onDelete: 'no action',
  onUpdate: 'no action',
  foreignKey: {
    field: 'id_racao',
    name: 'idRacao',
    allowNull: false,
  },
});

export default Alimentacao;
