import { TestSuite, Test, TestCase } from 'testyts'
import * as E from 'fp-ts/lib/Either'
import * as O from 'fp-ts/lib/Option'
import * as assert from 'assert'
import { assertSingleElement } from '../../lib/util/array'

@TestSuite('Array Util Tests')
export class ArrayUtilTests {
    @Test()
    @TestCase('happy path - single element', O.some([1]), E.right([1]))
    @TestCase(
        'error - more than one element',
        O.some([1, 2]),
        E.left(new Error('Expected 1 element in array and found 2'))
    )
    @TestCase(
        'error - empty array',
        O.some([]),
        E.left(new Error('Expected 1 element in array and found none'))
    )
    assertSingleElementTest<T>(
        input: O.Option<Array<T>>,
        expected: E.Either<Error, Array<T>>
    ) {
        assert.deepStrictEqual(assertSingleElement(input), expected)
    }
}
