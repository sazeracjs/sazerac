export class TestCase {
  expect(returnValue): this
  describe(message: string): this
  should(message: string): this
  assert(message: string, assertFunction: (actualReturnValue: any) => void): this
}

export function test(testFn: Function, definerFn: Function): void
export function given(...args: any[]): TestCase
