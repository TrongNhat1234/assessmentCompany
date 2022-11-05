module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('hrlistgames', {
      hr_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        references: {
          model: 'hrs',
          key: 'hr_id',
        },
      },
      game_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
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

  down: async (queryInterface) => queryInterface.dropTable('hrlistgames'),
}
