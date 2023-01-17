import { apiUrl } from '@/env'
import { useUIStore } from '@/stores/ui'
import { useUserStore } from '@/stores/user'
import { useCookies } from '@vueuse/integrations/useCookies'
import { GraphQLClient, ClientError } from 'graphql-request'
import type { GraphQLError } from 'graphql-request/dist/types'

export const graphqlClient = new GraphQLClient(apiUrl, {
    credentials: 'include',
    referrerPolicy: 'origin-when-cross-origin',
    mode: 'cors',
})

export function setAccessToken(token: string | null) {
    graphqlClient.setHeader('Authorization', token ? 'JWT ' + token : '')
}

export class ApiQuery<Response = void, Variables = void> {
    client = graphqlClient
    query: string

    async request(vars: Variables): Promise<Response> {
        try {
            const res = await this.client.request<Response, Variables>(
                this.query,
                vars
            )

            return res
        } catch (error: any) {
            if (error instanceof ClientError) {
                console.log(error)
                const mainError = (error.response.errors as GraphQLError[])[0]

                if (mainError.message === 'REFRESH') {
                    const UserStore = useUserStore()
                    // await UserStore.refresh()
                    return await this.request(vars)
                }
                if (mainError.message === 'INVALID') {
                    const UserStore = useUserStore()
                    // await UserStore.logout()
                }
                if (mainError.message === 'UNAUTHORIZED') {
                    const UIStore = useUIStore()
                    UIStore.popup = { name: 'login' }
                }
            }
            throw error
        }
    }

    constructor(query: string) {
        this.query = query
    }
}
