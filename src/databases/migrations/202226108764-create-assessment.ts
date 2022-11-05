module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('assessments', {
      ass_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      hiring_position: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      hr_id: {
        type: Sequelize.STRING,
        field: 'hr_id',
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'hrs',
          key: 'hr_id',
        },
      },

      start_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      end_date: {
        type: Sequelize.DATE,
        allowNull: true,
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

  down: async (queryInterface) => queryInterface.dropTable('assessments'),
}
