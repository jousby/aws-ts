import Organization from 'aws-sdk/clients/organizations'
import { fetchRootId } from './lib/aws/org-controller'
import { factory, prettyPrint } from './lib/util/logging'

const log = factory.getLogger('Main')

// AWS orgs only runs in 'us-east-1' as at 1/1/2020
const org = new Organization({ region: 'us-east-1' })

const main = () => {
    fetchRootId(org)()
        .then(result => log.debug(prettyPrint(result)))
        .catch(reason => log.error(reason))
}

main()
