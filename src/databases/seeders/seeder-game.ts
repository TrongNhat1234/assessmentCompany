const wrapValuesWithDateTime6 = require('../utils/wrapValuesWithDateTime.ts')

const games = [
  {
    question: 'a',
    answer: 1,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'B',
    answer: 1,
    level: 8,
    game_id: 'game02',
  },
  {
    question: 'C',
    answer: 1,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'D',
    answer: 2,
    level: 2,
    game_id: 'game04',
  },

  {
    question: 'a',
    answer: 2,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'B',
    answer: 1,
    level: 9,
    game_id: 'game02',
  },
  {
    question: 'C',
    answer: 1,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'D',
    answer: 1,
    level: 2,
    game_id: 'game04',
  },

  {
    question: 'a',
    answer: 2,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'B',
    answer: 1,
    level: 3,
    game_id: 'game02',
  },
  {
    question: 'C',
    answer: 2,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'D',
    answer: 1,
    level: 2,
    game_id: 'game04',
  },

  {
    question: 'a',
    answer: 1,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'B',
    answer: 1,
    level: 4,
    game_id: 'game02',
  },
  {
    question: 'C',
    answer: 2,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'D',
    answer: 2,
    level: 2,
    game_id: 'game04',
  },

  {
    question: 'a',
    answer: 1,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'B',
    answer: 1,
    level: 5,
    game_id: 'game02',
  },
  {
    question: 'C',
    answer: 1,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'D',
    answer: 2,
    level: 2,
    game_id: 'game04',
  },

  {
    question: 'a',
    answer: 2,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'B',
    answer: 1,
    level: 6,
    game_id: 'game02',
  },
  {
    question: 'C',
    answer: 1,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'D',
    answer: 1,
    level: 2,
    game_id: 'game04',
  },

  {
    question: 'a',
    answer: 2,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'B',
    answer: 1,
    level: 7,
    game_id: 'game02',
  },
  {
    question: 'C',
    answer: 2,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'D',
    answer: 1,
    level: 2,
    game_id: 'game04',
  },
  {
    question: 'a',
    answer: 1,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'B',
    answer: 1,
    level: 12,
    game_id: 'game02',
  },
  {
    question: 'C',
    answer: 1,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'D',
    answer: 2,
    level: 2,
    game_id: 'game04',
  },

  {
    question: 'a',
    answer: 2,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'B',
    answer: 1,
    level: 13,
    game_id: 'game02',
  },
  {
    question: 'C',
    answer: 1,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'D',
    answer: 1,
    level: 2,
    game_id: 'game04',
  },

  {
    question: 'a',
    answer: 2,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'B',
    answer: 1,
    level: 10,
    game_id: 'game02',
  },
  {
    question: 'C',
    answer: 2,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'D',
    answer: 1,
    level: 2,
    game_id: 'game04',
  },

  {
    question: 'a',
    answer: 1,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'B',
    answer: 1,
    level: 11,
    game_id: 'game02',
  },
  {
    question: 'C',
    answer: 2,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'D',
    answer: 2,
    level: 2,
    game_id: 'game04',
  },

  {
    question: 'a',
    answer: 1,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'B',
    answer: 1,
    level: 14,
    game_id: 'game02',
  },
  {
    question: 'C',
    answer: 1,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'D',
    answer: 2,
    level: 2,
    game_id: 'game04',
  },

  {
    question: 'a',
    answer: 2,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'B',
    answer: 1,
    level: 15,
    game_id: 'game02',
  },
  {
    question: 'C',
    answer: 1,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'D',
    answer: 1,
    level: 2,
    game_id: 'game04',
  },

  {
    question: 'a',
    answer: 2,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'B',
    answer: 1,
    level: 16,
    game_id: 'game02',
  },
  {
    question: 'C',
    answer: 2,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'D',
    answer: 2,
    level: 2,
    game_id: 'game04',
  },
  {
    question: 'a',
    answer: 1,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'B',
    answer: 1,
    level: 17,
    game_id: 'game02',
  },
  {
    question: 'C',
    answer: 1,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'D',
    answer: 2,
    level: 2,
    game_id: 'game04',
  },

  {
    question: 'a',
    answer: 2,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'B',
    answer: 1,
    level: 18,
    game_id: 'game02',
  },
  {
    question: 'C',
    answer: 1,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'D',
    answer: 1,
    level: 2,
    game_id: 'game04',
  },

  {
    question: 'a',
    answer: 2,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'B',
    answer: 1,
    level: 19,
    game_id: 'game02',
  },
  {
    question: 'C',
    answer: 2,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'D',
    answer: 1,
    level: 2,
    game_id: 'game04',
  },

  {
    question: 'a',
    answer: 1,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'B',
    answer: 1,
    level: 20,
    game_id: 'game02',
  },
  {
    question: 'C',
    answer: 2,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'D',
    answer: 2,
    level: 2,
    game_id: 'game04',
  },

  {
    question: 'a',
    answer: 1,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'B',
    answer: 1,
    level: 21,
    game_id: 'game02',
  },
  {
    question: 'C',
    answer: 1,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'D',
    answer: 2,
    level: 2,
    game_id: 'game04',
  },

  {
    question: 'a',
    answer: 2,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'B',
    answer: 1,
    level: 2,
    game_id: 'game02',
  },
  {
    question: 'C',
    answer: 1,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'D',
    answer: 1,
    level: 2,
    game_id: 'game04',
  },

  {
    question: 'a',
    answer: 2,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'B',
    answer: 1,
    level: 1,
    game_id: 'game02',
  },
  {
    question: 'C',
    answer: 2,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'D',
    answer: 1,
    level: 2,
    game_id: 'game04',
  },
  {
    question: 'a',
    answer: 1,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'B',
    answer: 1,
    level: 22,
    game_id: 'game02',
  },
  {
    question: 'C',
    answer: 1,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'D',
    answer: 2,
    level: 2,
    game_id: 'game04',
  },

  {
    question: 'a',
    answer: 2,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'B',
    answer: 1,
    level: 23,
    game_id: 'game02',
  },
  {
    question: 'C',
    answer: 1,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'D',
    answer: 1,
    level: 2,
    game_id: 'game04',
  },

  {
    question: 'a',
    answer: 2,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'B',
    answer: 1,
    level: 24,
    game_id: 'game02',
  },
  {
    question: 'C',
    answer: 2,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'D',
    answer: 1,
    level: 2,
    game_id: 'game04',
  },

  {
    question: 'a',
    answer: 1,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'B',
    answer: 1,
    level: 25,
    game_id: 'game02',
  },
  {
    question: 'C',
    answer: 2,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'D',
    answer: 2,
    level: 2,
    game_id: 'game04',
  },

  {
    question: 'a',
    answer: 1,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'B',
    answer: 1,
    level: 5,
    game_id: 'game04',
  },
  {
    question: 'C',
    answer: 1,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'D',
    answer: 2,
    level: 2,
    game_id: 'game04',
  },

  {
    question: 'a',
    answer: 2,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'B',
    answer: 1,
    level: 6,
    game_id: 'game04',
  },
  {
    question: 'C',
    answer: 1,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'D',
    answer: 1,
    level: 2,
    game_id: 'game04',
  },

  {
    question: 'a',
    answer: 2,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'B',
    answer: 2,
    level: 7,
    game_id: 'game04',
  },
  {
    question: 'C',
    answer: 2,
    level: 1,
    game_id: 'game04',
  },
  {
    question: 'D',
    answer: 2,
    level: 2,
    game_id: 'game04',
  },

  {
    question: 'a',
    answer: 1,
    level: 1,
    game_id: 'game02',
  },
  {
    question: 'B',
    answer: 1,
    level: 8,
    game_id: 'game02',
  },
  {
    question: 'C',
    answer: 1,
    level: 1,
    game_id: 'game02',
  },
  {
    question: 'D',
    answer: 2,
    level: 2,
    game_id: 'game02',
  },

  {
    question: 'a',
    answer: 2,
    level: 2,
    game_id: 'game02',
  },
  {
    question: 'B',
    answer: 1,
    level: 9,
    game_id: 'game02',
  },
  {
    question: 'C',
    answer: 1,
    level: 3,
    game_id: 'game02',
  },
  {
    question: 'D',
    answer: 1,
    level: 4,
    game_id: 'game02',
  },

  {
    question: 'a',
    answer: 2,
    level: 5,
    game_id: 'game02',
  },
  {
    question: 'B',
    answer: 1,
    level: 6,
    game_id: 'game02',
  },
  {
    question: 'C',
    answer: 2,
    level: 7,
    game_id: 'game02',
  },
]

module.exports = {
  async up(queryInterface) {
    return [await queryInterface.bulkInsert('games', wrapValuesWithDateTime6(games))]
  },

  async down(queryInterface) {
    return [
      await queryInterface.bulkDelete('games', null, {
        //hr_id: hrs.map((hr) => hr.hr_id),
      }),
    ]
  },
}
