'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Ensure existing NULLs become 0 before adding default/allowNull constraint
    await queryInterface.sequelize.query('UPDATE Products SET view = 0 WHERE view IS NULL');
    await queryInterface.sequelize.query('UPDATE Blogs SET view = 0 WHERE view IS NULL');

    await queryInterface.changeColumn('Products', 'view', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });
    await queryInterface.changeColumn('Blogs', 'view', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove default (keep column nullable to avoid breaking existing code)
    await queryInterface.changeColumn('Products', 'view', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
    });
    await queryInterface.changeColumn('Blogs', 'view', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
    });
  },
};

