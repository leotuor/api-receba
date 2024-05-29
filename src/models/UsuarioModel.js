import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config';
import Cargo from './CargoModel';

const Usuario = sequelize.define(
  'usuario',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.TEXT,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passwordHash: {
      field: 'password_hash',
      type: DataTypes.TEXT,
      allowNull: false,
    },
    profileImage: {
      field: 'profile_image',
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

Usuario.belongsTo(Cargo, {
  as: 'cargo',
  onDelete: 'no action',
  onUpdate: 'no action',
  foreignKey: {
    field: 'id_cargo',
    name: 'idCargo',
    allowNull: false,
  },
});

export default Usuario;
