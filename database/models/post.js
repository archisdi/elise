const {
    DBContext
} = require('@archisdi/zuu');

const { Model, DataTypes } = DBContext.getORMProvider();

class Post extends Model {}

Post.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    author_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    deleted_at: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    sequelize: DBContext.getContext(),
    underscored: true,
    paranoid: true,
    tableName: 'posts'
});

Post.associate = (models) => {
    // 
};

module.exports = Post;