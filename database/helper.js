exports.generateConfig = (env) => {
    const [dialect, temp] = env.split('://');
    const [credential, temp2] = temp.split('@');
    const [username, password = ''] = credential.split(':');
    const [server, database] = temp2.split('/');
    const [host, port] = server.split(':');
    return {
        username,
        password,
        database,
        port,
        host,
        dialect
    };
};

exports.generateMigration = (tableName, model) => ({
    up: (queryInterface, dataTypes) => queryInterface.createTable(tableName, model(dataTypes)),
    down: (queryInterface, Sequelize) => queryInterface.dropTable(tableName)
});

module.exports = exports;
