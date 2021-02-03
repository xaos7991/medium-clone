import popularTagsApi from '@/api/popularTags'

const state = {
  popularTags: null,
  isLoading: false,
  error: null
}

export const mutatationTypes = {
  getPopularTagsStart: '[popularTags] Get popular tags start',
  getPopularTagsSuccess: '[popularTags] Get popular tags success',
  getPopularTagsFailure: '[popularTags] Get popular tags failure'
}

export const actionTypes = {
  getPopularTags: '[popularTags] Get popular tags'
}

const mutations = {
  [mutatationTypes.getPopularTagsStart](state) {
    state.isLoading = true
    state.popularTags = null
  },
  [mutatationTypes.getPopularTagsSuccess](state, payload) {
    state.isLoading = false
    state.popularTags = payload
  },
  [mutatationTypes.getPopularTagsFailure](state) {
    state.isLoading = false
  }
}

const actions = {
  [actionTypes.getPopularTags](context) {
    return new Promise(resolve => {
      context.commit(mutatationTypes.getPopularTagsStart)
      popularTagsApi.getPopularTags().then(popularTags => {
        context.commit(mutatationTypes.getPopularTagsSuccess, popularTags)
        resolve()
      })
    }).catch(() => {
      context.commit(mutatationTypes.getPopularTagsFailure)
    })
  }
}

export default {
  state,
  actions,
  mutations
}
