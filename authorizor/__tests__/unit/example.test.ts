import { add } from 'src/app/example.js'

describe('add', () => {
  it('adds two numbers', () => {
    expect(add(1, 2)).toBe(3)
  })
})
