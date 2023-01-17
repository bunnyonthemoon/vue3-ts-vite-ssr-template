import { ApiQuery } from '../setup'
import { gql } from 'graphql-request'

export default new ApiQuery<
    {
        tokenAuth: {
            token: string
        }
    },
    {
        username: string
        password: string
    }
>(
    gql`
        mutation Signup($password: String!, $username: String!) {
            tokenAuth(username: $username, password: $password) {
                token
            }
        }
    `
)
