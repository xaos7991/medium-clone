import articleApi from '@/api/article'

const state = {
  data: null,
  isLoading: false,
  error: null
}

export const mutatationTypes = {
  getArticleStart: '[article] Get article start',
  getArticleSuccess: '[article] Get article success',
  getArticleFailure: '[article] Get article failure',

  deleteArticleStart: '[article] Delete article start',
  deleteArticleSuccess: '[article] Delete article success',
  deleteArticleFailure: '[article] Delete article failure'
}

export const actionTypes = {
  getArticle: '[article] Get article',
  deleteArticle: '[article] Delete  article'
}

const mutations = {
  [mutatationTypes.getArticleStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutatationTypes.getArticleSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutatationTypes.getArticleFailure](state) {
    state.isLoading = false
  },
  [mutatationTypes.deleteArticleStart]() {},
  [mutatationTypes.deleteArticleSuccess]() {},
  [mutatationTypes.deleteArticleFailure]() {}
}

const actions = {
  [actionTypes.getArticle](context, {slug}) {
    return new Promise(resolve => {
      context.commit(mutatationTypes.getArticleStart, slug)
      articleApi.getArticle(slug).then(article => {
        context.commit(mutatationTypes.getArticleSuccess, article)
        resolve(article)
      })
    }).catch(() => {
      context.commit(mutatationTypes.getArticleFailure)
    })
  },
  [actionTypes.deleteArticle](context, {slug}) {
    return new Promise(resolve => {
      context.commit(mutatationTypes.deleteArticleStart, slug)
      articleApi.deleteArticle(slug).then(() => {
        context.commit(mutatationTypes.deleteArticleSuccess)
        resolve()
      })
    }).catch(() => {
      context.commit(mutatationTypes.deleteArticleFailure)
    })
  }
}

export default {
  state,
  actions,
  mutations
}
