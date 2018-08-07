import db from '../models/sequelize';

export default {
  findOne: (conditions: object, attributes: string[] | null = null) => db.User.findOne({ where: conditions, attributes }),
  findAll: (conditions: object, attributes: string[] | null = null) => db.User.findAll({ where: conditions, attributes })
};
