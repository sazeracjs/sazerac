export class TestCase {
  expect(returnValue: any): this
  describe(message: string): this
  should(message: string): this
  assert(
    message: string,
    assertFunction: (actualReturnValue: any) => void
  ): this
}

export interface Given extends TestCase {}

export function test(testFn: Function, definerFn: Function): void
export function given(...args: any[]): Given
export function forCases(testCases: Given[]): TestCase
