module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('games', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      question: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      answer: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      level: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      game_id: {
        type: Sequelize.STRING,
        field: 'game_id',
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'listgames',
          key: 'game_id',
        },
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at',
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at',
      },
    })
  },

  down: async (queryInterface) => queryInterface.dropTable('games'),
}
