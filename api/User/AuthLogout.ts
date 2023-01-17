import { ApiQuery } from '../setup'
import { gql } from 'graphql-request'

export default new ApiQuery<{ logout: { result: boolean } }>(
    gql`
        mutation Logout {
            logout {
                result
            }
        }
    `
)
