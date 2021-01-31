import feedApi from '@/api/feed'

const state = {
  data: null,
  isLoading: false,
  error: null
}

export const mutatationTypes = {
  getFeedStart: '[feed] Get feed start',
  getFeedSuccess: '[feed] Get feed success',
  getFeedFailure: '[feed] Get feed failure'
}

export const actionTypes = {
  getFeed: '[feed] Get feed'
}

const mutations = {
  [mutatationTypes.getFeedStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutatationTypes.getFeedSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutatationTypes.getFeedFailure](state) {
    state.isLoading = false
  }
}

const actions = {
  [actionTypes.getFeed](context, {apiUrl}) {
    return new Promise(resolve => {
      context.commit(mutatationTypes.getFeedStart)
      feedApi.getFeed(apiUrl).then(response => {
        context.commit(mutatationTypes.getFeedSuccess, response.data)
        resolve(response.data)
      })
    }).catch(() => {
      context.commit(mutatationTypes.getFeedFailure)
    })
  }
}

export default {
  state,
  actions,
  mutations
}
