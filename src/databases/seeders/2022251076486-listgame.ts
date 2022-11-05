const wrapValuesWithDateTime3 = require('../utils/wrapValuesWithDateTime.ts')

const listgames = [
  {
    game_id: 'game01',
    type: 'Visual',
    status: 'Done Content',
    description: 'Identify which pair of images is identical',
    total_time: 90,
  },
  {
    game_id: 'game02',
    type: 'Memory',
    status: 'Done Content',
    description:
      'Each question appears a series of data, candidates have to input the same data in a required time (depending on the number of data). Skip option is not allowed, score based on level of memory',
  },
  {
    game_id: 'game03',
    type: 'Verbal',
    status: 'Done Content',
    description: 'Does these words have the same meaning?',
    total_time: 90,
  },
  {
    game_id: 'game04',
    type: 'Logical',
    status: 'Done Content',
    description:
      '3 entities and their relationships are shown in 2 statement, choose the conclusion that is infered from the 2 statements',
    total_time: 90,
  },
  {
    game_id: 'game05',
    type: 'Numerical',
    status: 'Done Content',
    description: 'Estimates',
    total_time: 100,
  },
  {
    game_id: 'game06',
    type: 'Personality',
    status: 'Done Content',
    description: 'Personality & culture fit questions',
  },
]

module.exports = {
  async up(queryInterface) {
    return [await queryInterface.bulkInsert('listgames', wrapValuesWithDateTime3(listgames))]
  },

  async down(queryInterface) {
    return [
      await queryInterface.bulkDelete('listgames', null, {
        //hr_id: hrs.map((hr) => hr.hr_id),
      }),
    ]
  },
}
