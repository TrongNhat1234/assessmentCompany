import { Assessment } from '../../models/entities/assessment.entity'
import AssessmentRepository from '../../app/repositories/assessment.repository'

describe('Assessment', () => {
  describe('getAll', () => {
    test('getAll assessment with some expected item', async () => {
      const assessment = new AssessmentRepository(Assessment)
      const expectedItem = [
        expect.objectContaining({
          ass_id: 'ass01',
          name: 'ass0002',
          hiring_position: 'leader',
        }),
      ]
      const data = await assessment.getAll()
      expect(data).toEqual(expectedItem)
    })
  })

  describe('get by id', () => {
    test('ass_id = ass01', async () => {
      const expected = expect.objectContaining({
        ass_id: 'ass01',
        name: 'ass0002',
        hiring_position: 'leader',
      })
      const ass = new AssessmentRepository(Assessment)
      const data = await ass.findByAssId('ass01')
      expect(data).toEqual(expected)
    })

    test('ass_id = ass05', async () => {
      const ass = new AssessmentRepository(Assessment)
      const data = await ass.findByAssId('hr05')
      expect(data).toBeNull()
    })
  })
})

describe('assessment', () => {
  describe('create', () => {
    describe('error case', () => {
      test('Validation error', async () => {
        const testdata = {
          ass_id: 'hr01',
        }
        const ass = new AssessmentRepository(Assessment)
        const findPending = ass.create(testdata)
        const data = findPending
        expect(data).rejects.toThrowError('Validation error')
      })
    })

    describe('success case', () => {
      const expected = expect.objectContaining({
        ass_id: 'ass03',
        name: 'ass0003',
        hiring_position: 'leader',
      })

      const cases = [
        {
          params: {
            ass_id: 'ass03',
            name: 'ass0003',
            hiring_position: 'leader',
          },

          expected: expected,
        },
      ]
      test.each(cases)('CREATE hr successful - CHECK IN database', async ({ params, expected }) => {
        const ass = new AssessmentRepository(Assessment)
        const response = await ass.create(params)
        expect(response).toEqual(expected)
      })
    })
  })
})
