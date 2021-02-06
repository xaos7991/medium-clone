import userProfileApi from '@/api/userProfile'

const state = {
  data: null,
  isLoading: false,
  error: null
}

export const mutatationTypes = {
  getUserProfileStart: '[userProfile] Get user profile start',
  getUserProfileSuccess: '[userProfile] Get user profile success',
  getUserProfileFailure: '[userProfile] Get user profile failure'
}

export const actionTypes = {
  getUserProfile: '[userProfile] Get user profile'
}

const mutations = {
  [mutatationTypes.getUserProfileStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutatationTypes.getUserProfileSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutatationTypes.getUserProfileFailure](state) {
    state.isLoading = false
  }
}

const actions = {
  [actionTypes.getUserProfile](context, {slug}) {
    return new Promise(resolve => {
      context.commit(mutatationTypes.getUserProfileStart)
      userProfileApi.getUserProfile(slug).then(userProfile => {
        context.commit(mutatationTypes.getUserProfileSuccess, userProfile)
        resolve()
      })
    }).catch(() => {
      context.commit(mutatationTypes.getUserProfileFailure)
    })
  }
}

export default {
  state,
  actions,
  mutations
}
