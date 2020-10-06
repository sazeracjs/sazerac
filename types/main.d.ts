export class TestCase<Fn extends (...args: any[]) => any> {
  expect(returnValue: ReturnType<Fn>): this;
  describe(message: string): this;
  should(message: string): this;
  assert(
    message: string,
    assertFunction: (actualReturnValue: ReturnType<Fn>) => void
  ): this;
}

export interface Given<Fn extends (...args: any[]) => any>
  extends TestCase<Fn> {}

export function test<Fn extends (...args: any[]) => any>(
  testFn: Fn,
  definerFn: () => void
): void;

export function given<Fn extends (...args: any[]) => any>(
  ...args: Parameters<Fn>
): Given<Fn>;

export function forCases<Fn extends (...args: any[]) => any>(
  testCases: Given<Fn>[]
): TestCase<Fn>;
