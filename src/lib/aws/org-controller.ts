import Organization, { Roots, RootId } from 'aws-sdk/clients/organizations'
import { pipe } from 'fp-ts/lib/pipeable'
import { Option } from 'fp-ts/lib/Option'
import * as O from 'fp-ts/lib/Option'
import { TaskEither } from 'fp-ts/lib/TaskEither'
import * as TE from 'fp-ts/lib/TaskEither'
import * as A from 'fp-ts/lib/Array'
import { assertSingleElement } from '../util/array'
import { factory, logIntermediateResult } from '../util/logging'
import { LogLevel } from 'typescript-logging'

const log = factory.getLogger('OrgController')

const fetchRoots = (
    org: Organization
): TaskEither<Error, Organization.ListRootsResponse> =>
    TE.tryCatch(
        () => org.listRoots().promise(),
        reason => new Error(String(reason))
    )

const getRootId = (roots: Roots): Option<RootId> =>
    pipe(
        A.head(roots),
        O.mapNullable(root => root.Id)
    )

export const fetchRootId = (org: Organization): TaskEither<Error, Option<RootId>> =>
    pipe(
        fetchRoots(org),
        TE.map(logIntermediateResult(log, LogLevel.Debug)),
        TE.map(response => O.fromNullable(response.Roots)),
        TE.chain(roots => TE.fromEither(assertSingleElement(roots))),
        TE.map(getRootId)
    )
