import { TestSuite, Test, TestCase } from 'testyts'
import rewire from 'rewire'
import * as O from 'fp-ts/lib/Option'
import * as assert from 'assert'
import { Roots, RootId } from 'aws-sdk/clients/organizations'

@TestSuite('Org Controller Tests')
export class OrgControllerTests {
    @Test()
    @TestCase(
        'happy path - single well formed Root object',
        [{ Id: 'myrootid' }],
        O.some('myrootid')
    )
    getRootIdTest(input: Roots, expected: O.Option<RootId>) {
        const rewiredOrgController = rewire('../../lib/aws/org-controller')
        const getRootId = rewiredOrgController.__get__('getRootId')

        assert.deepStrictEqual(getRootId(input), expected)
    }
}
