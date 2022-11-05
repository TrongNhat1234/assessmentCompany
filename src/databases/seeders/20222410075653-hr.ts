const wrapValuesWithDateTime1 = require('../utils/wrapValuesWithDateTime.ts')

const hrs = [
  {
    hr_id: 'hr01',
    name: 'hr0001',
    role: 'leader',
    email: 'hr01@example.com',
    password: '123456',
  },
]

module.exports = {
  async up(queryInterface) {
    return [await queryInterface.bulkInsert('hrs', wrapValuesWithDateTime1(hrs))]
  },

  async down(queryInterface) {
    return [
      await queryInterface.bulkDelete('hrs', null, {
        //hr_id: hrs.map((hr) => hr.hr_id),
      }),
    ]
  },
}
