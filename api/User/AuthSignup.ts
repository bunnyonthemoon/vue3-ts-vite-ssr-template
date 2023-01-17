import { ApiQuery } from '../setup'
import { gql } from 'graphql-request'

export default new ApiQuery<
    {
        signup: {
            error?: string
        }
    },
    {
        email: string
        username: string
        password: string
    }
>(
    gql`
        mutation Signup(
            $email: String!
            $password: String!
            $username: String!
        ) {
            signup(email: $email, password: $password, username: $username) {
                user {
                    username
                }
                error
            }
        }
    `
)
