import { AssessmentListGame } from '../../models/entities/assessmentlistgame.entity'
import AssessmentListgameRepository from '../../app/repositories/assessmentlistgame.repository'

describe('Assessment listgame', () => {
  describe('getAll', () => {
    test('getAll assessment with some expected item', async () => {
      const assessmentls = new AssessmentListgameRepository(AssessmentListGame)
      const expectedItem = [
        expect.objectContaining({
          ass_id: 'ass01',
          game_id: 'game01',
        }),
        expect.objectContaining({
          ass_id: 'ass01',
          game_id: 'game02',
        }),
      ]
      const data = await assessmentls.getAll()
      expect(data).toEqual(expectedItem)
    })
  })

  describe('get by id', () => {
    test('ass_id = ass01', async () => {
      const expected = [
        expect.objectContaining({
          ass_id: 'ass01',
          game_id: 'game01',
        }),
      ]
      const ass = new AssessmentListgameRepository(AssessmentListGame)
      const data = await ass.findByAssId('ass01')
      expect(data).toEqual(expected)
    })

    test('ass_id = ass05', async () => {
      const ass = new AssessmentListgameRepository(AssessmentListGame)
      const data = await ass.findByAssId('ass05')
      expect(data).toEqual([])
    })
  })
})
