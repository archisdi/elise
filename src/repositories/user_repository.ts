import db from '../database/sequelize';

const findOne = (where: object, attributes: string[] | null = null) => {
  return db.User.findOne({ where, attributes });
};

export default {
  findOne
};
