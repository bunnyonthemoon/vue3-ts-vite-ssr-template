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
>(gql`
    mutation Login($username: String!, $password: String!) {
        tokenAuth(username: $username, password: $password) {
            token
        }
        login(password: $password, username: $username) {
            user {
                username
            }
        }
    }
`)
