import Hr from '../../models/entities/hr.entity'
import HrRepository from '../../app/repositories/hr.repository'
describe('Hr', () => {
  describe('create', () => {
    describe('error case', () => {
      test('Validation error', async () => {
        const testdata = {
          hr_id: 'hr03',
          role: 'leader',
          email: 'hr03@example.com',
          password: '123456',
        }
        const hr = new HrRepository(Hr)
        const findPending = hr.create(testdata)
        const data = findPending
        expect(data).rejects.toThrowError('Validation error')
      })
    })

    describe('success case', () => {
      const expected = expect.objectContaining({
        hr_id: 'hr03',
        name: 'hr0003',
        role: 'leader',
        email: 'hr03@example.com',
        password: '123456',
      })

      const cases = [
        {
          params: {
            hr_id: 'hr03',
            name: 'hr0003',
            role: 'leader',
            email: 'hr03@example.com',
            password: '123456',
          },

          expected: expected,
        },
      ]
      test.each(cases)('CREATE hr successful - CHECK IN database', async ({ params, expected }) => {
        const hr = new HrRepository(Hr)
        const response = await hr.create(params)
        expect(response).toEqual(expected)
      })
    })
  })
})

describe('Hr', () => {
  describe('getAll', () => {
    test('getAll Collection with some expected item', async () => {
      const collection = new HrRepository(Hr)
      const expectedItem = [
        expect.objectContaining({
          hr_id: 'hr01',
          name: 'hr0001',
          role: 'leader',
          email: 'hr01@example.com',
          password: '123456',
        }),
        expect.objectContaining({
          hr_id: 'hr02',
          name: 'hr002',
          role: 'employee',
          email: 'hr2@gmail.com',
          password: '123456',
        }),
        expect.objectContaining({
          hr_id: 'hr03',
          name: 'hr0003',
          role: 'leader',
          email: 'hr03@example.com',
          password: '123456',
        }),
        expect.objectContaining({
          hr_id: 'hr04',
          name: 'hr0004',
          role: 'leader',
          email: 'hr04@example.com',
          password: '123456',
        }),
      ]
      const data = await collection.getAll()
      expect(data).toEqual(expectedItem)
    })
  })

  describe('get by id', () => {
    test('hr_id = hr02', async () => {
      const expected = expect.objectContaining({
        hr_id: 'hr02',
        name: 'hr002',
        role: 'employee',
        email: 'hr2@gmail.com',
        password: '123456',
      })
      const hr = new HrRepository(Hr)
      const data = await hr.findByHrId('hr02')
      expect(data).toEqual(expected)
    })

    test('hr_id = 5', async () => {
      const hr = new HrRepository(Hr)
      const data = await hr.findByHrId('hr05')
      expect(data).toBeNull()
    })
  })
})
