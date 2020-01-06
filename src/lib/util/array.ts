import { pipe } from 'fp-ts/lib/pipeable'
import { Option } from 'fp-ts/lib/Option'
import * as O from 'fp-ts/lib/Option'
import { Either } from 'fp-ts/lib/Either'
import * as E from 'fp-ts/lib/Either'

/**
 * Assert that an array contains a single element.
 *
 * Some of the AWS api calls model the response as an array even when expecting a single
 * element to support possible future extensions. If your code relies on there being only
 * one of something in the response then this assertion will alert you if that assumption
 * ever changes in the future.
 *
 * @param o an optional array of T
 */
export const assertSingleElement = <T>(o: Option<Array<T>>): Either<Error, Array<T>> => {
    const length = pipe(
        o,
        O.map(arr => arr.length),
        O.getOrElse(() => 0)
    )

    if (length > 1) {
        return E.left(new Error(`Expected 1 element in array and found ${length}`))
    } else if (length < 1) {
        return E.left(new Error('Expected 1 element in array and found none'))
    } else {
        const array = pipe(
            o,
            O.getOrElse(() => [] as T[])
        )
        return E.right(array)
    }
}
