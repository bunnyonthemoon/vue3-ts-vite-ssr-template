import { ApiQuery } from '../setup'
import { gql } from 'graphql-request'
import FragmentUserPrivate from '../fragments/FragmentUserPrivate'
import type { IUserPrivate } from '@/interfaces/user'

export default new ApiQuery<{
    getProfile: IUserPrivate
}>(gql`
    mutation GetProfile {
        getProfile ${FragmentUserPrivate}
    }
`)
