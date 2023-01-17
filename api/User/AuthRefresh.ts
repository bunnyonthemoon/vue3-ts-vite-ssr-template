import { ApiQuery } from '../setup'
import { gql } from 'graphql-request'

export default new ApiQuery<
    {
        userRefresh: {
            accessToken: string | null
        }
    },
    {
        fingerprint: string
    }
>(
    gql`
        mutation REFRESH($fingerprint: String!) {
            userRefresh(fingerprint: $fingerprint) {
                accessToken
            }
        }
    `
)
