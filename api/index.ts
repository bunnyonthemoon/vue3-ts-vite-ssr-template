import { apiUrl } from '@/env'
import {
    ApolloClient,
    createHttpLink,
    gql,
    InMemoryCache,
} from '@apollo/client/core'
import { provideApolloClient } from '@vue/apollo-composable'

// HTTP connection to the API
const httpLink = createHttpLink({
    // You should use an absolute URL here
    uri: apiUrl,
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
export const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
})

provideApolloClient(apolloClient)
