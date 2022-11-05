import HrListGame from '../../models/entities/hrlistgame.entity'
import HrListGameRepository from '../../app/repositories/hrlistgame.repository'

describe('HrListGame', () => {
  describe('create', () => {
    describe('error case', () => {
      test('Validation error', async () => {
        const testdata = {
          hr_id: 'hr01',
        }
        const hrlistgame = new HrListGameRepository(HrListGame)
        const findPending = hrlistgame.create(testdata)
        const data = findPending
        expect(data).rejects.toThrowError('Validation error')
      })
    })

    describe('success case', () => {
      const expected = expect.objectContaining({
        hr_id: 'hr01',
        game_id: 'game01',
      })

      const cases = [
        {
          params: {
            hr_id: 'hr01',
            game_id: 'game05',
          },

          expected: expected,
        },
      ]
      test.each(cases)('CREATE hr successful - CHECK IN database', async ({ params, expected }) => {
        const hrlistgame = new HrListGameRepository(HrListGame)
        const response = await hrlistgame.create(params)
        expect(response).toEqual(expected)
      })
    })
  })
})

describe('Hr List Game', () => {
  describe('getAll', () => {
    test('getAll HrListGame with some expected item', async () => {
      const hrlistgame = new HrListGameRepository(HrListGame)
      console.log(hrlistgame)
      const expectedItem = [
        expect.objectContaining({
          hr_id: 'hr01',
          game_id: 'game01',
        }),
      ]
      const data = await hrlistgame.getAll()
      expect(data).toEqual(expectedItem)
    })
  })

  describe('get by id', () => {
    test('hr_id = hr01', async () => {
      const expected = [
        expect.objectContaining({
          hr_id: 'hr01',
          game_id: 'game01',
        }),
      ]
      const hrlistgame = new HrListGameRepository(HrListGame)
      const data = await hrlistgame.findByHrId('hr01')
      expect(data).toEqual(expected)
    })

    test('hr_id = hr02', async () => {
      const hrlistgame = new HrListGameRepository(HrListGame)
      const data = await hrlistgame.findByHrId('hr02')
      expect(data).toEqual([])
    })
  })
})
