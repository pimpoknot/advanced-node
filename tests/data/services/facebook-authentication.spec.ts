import { LoadFacebookUser } from '@/data/contracts/apis'
import { FacebookAuthenticationService } from '@/data/services'
import { AuthenticationError } from '@/domain/errors'
import { mock, MockProxy } from 'jest-mock-extended'

describe('FacebookAuthenticationService', () => {
  let loadFacebookUserApi: MockProxy<LoadFacebookUser>
  let sut: FacebookAuthenticationService
  beforeEach(() => {
    loadFacebookUserApi = mock()
    sut = new FacebookAuthenticationService(loadFacebookUserApi)
  })
  it('should call loadFacebookUserApi with correct params', async () => {
    await sut.perform({
      token: 'any_token'
    })

    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledWith({ token: 'any_token' })
    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledTimes(1)
  })

  it('should return AuthenticateError when  loadFacebookUserApi returns undefined', async () => {
    loadFacebookUserApi.loadUser.mockResolvedValueOnce(undefined)
    const authResult = await sut.perform({
      token: 'any_token'
    })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
