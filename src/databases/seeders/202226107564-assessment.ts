const wrapValuesWithDateTime5 = require('../utils/wrapValuesWithDateTime.ts')

const assessments = [
  {
    ass_id: 'ass01',
    name: 'ass0001',
    hiring_position: 'leader',
    hr_id: 'hr01',
  },
]

module.exports = {
  async up(queryInterface) {
    return [await queryInterface.bulkInsert('assessments', wrapValuesWithDateTime5(assessments))]
  },

  async down(queryInterface) {
    return [
      await queryInterface.bulkDelete('assessments', null, {
        //hr_id: hrs.map((hr) => hr.hr_id),
      }),
    ]
  },
}
