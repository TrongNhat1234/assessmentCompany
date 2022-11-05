module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('results', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      avarage_aptitude: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      visual: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      memory: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      verbal: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      logical: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      numerical: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      personality: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      assr_id: {
        type: Sequelize.STRING,
        field: 'assr_id',
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'assessments',
          key: 'ass_id',
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

  down: async (queryInterface) => queryInterface.dropTable('results'),
}
