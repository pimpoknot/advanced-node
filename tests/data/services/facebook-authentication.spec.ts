import { LoadFacebookUser } from '@/data/contracts/apis'
import { FacebookAuthenticationService } from '@/data/services'
import { AuthenticationError } from '@/domain/errors'
import { mock } from 'jest-mock-extended'
// class LoadFacebookUserApiSpy implements LoadFacebookUser {
//   token?: string
//   callsCount = 0
//   result = undefined

//   async loadUser (params: LoadFacebookUserApi.Params): Promise<LoadFacebookUserApi.Result> {
//     this.token = params.token
//     this.callsCount++
//     return this.result
//   }
// }

describe('FacebookAuthenticationService', () => {
  it('should call loadFacebookUserApi with correct params', async () => {
    const loadFacebookUserApi = mock<LoadFacebookUser>()
    const sut = new FacebookAuthenticationService(loadFacebookUserApi)
    await sut.perform({
      token: 'any_token'
    })

    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledWith({ token: 'any_token' })
    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledTimes(1)
  })

  it('should return AuthenticateError when  loadFacebookUserApi returns undefined', async () => {
    const loadFacebookUserApi = mock<LoadFacebookUser>()
    loadFacebookUserApi.loadUser.mockResolvedValueOnce(undefined)
    const sut = new FacebookAuthenticationService(loadFacebookUserApi)
    const authResult = await sut.perform({
      token: 'any_token'
    })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
