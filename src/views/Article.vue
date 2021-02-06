<template>
  <div class="article-page">
    <div class="banner">
      <div class="container" v-if="article">
        <h1>{{ article.title }}</h1>
        <div class="article-meta">
          <router-link
            :to="{name: 'userProfile', params: {slug: article.author.username}}"
          >
            <img :src="article.author.image" />
          </router-link>
          <div class="info">
            <router-link
              :to="{
                name: 'userProfile',
                params: {slug: article.author.username}
              }"
            >
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <span v-if="!isAuthor">
            <button class="btn btn-sm btn-primary" @click="addToFavorite">
              <i class="ion-heart" />
              <span>
                {{ isFavorited ? 'Unfavorite Article ' : 'Favorite Article ' }}
                &nbsp; ({{ article.favoritesCount }})
              </span>
            </button>
          </span>
          <span v-if="isAuthor">
            <router-link
              class="btn btn-outline-secondary btn-sm"
              :to="{name: 'editArticle', params: {slug: article.slug}}"
            >
              <i class="ion-edit" />
              Edit Article
            </router-link>
            <button
              class="btn btn-outline-danger btn-sm"
              @click="deleteArticle"
            >
              <i class="ion-trash-a" />
              Delete article
            </button>
          </span>
        </div>
      </div>
    </div>
    <div class="container page">
      <mcv-loading v-if="isLoading" />
      <mcv-error-message v-if="error" :message="error" />
      <div class="row article-content" v-if="article">
        <div class="col-xs-12">
          <div>
            <p>
              {{ article.body }}
            </p>
          </div>
          <mcv-tag-list :tags="article.tagList" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {actionTypes as articleActionTypes} from '@/store/modules/article'
import {actionTypes as addToFavirutesActionTypes} from '@/store/modules/addToFavorites'
import {getterTypes as authGetterTypes} from '@/store/modules/auth'
import {mapState, mapGetters} from 'vuex'
import McvLoading from '@/components/Loading'
import McvErrorMessage from '@/components/ErrorMessage'
import McvTagList from '@/components/TagList'

export default {
  name: 'MvcArticle',
  components: {
    McvLoading,
    McvErrorMessage,
    McvTagList
  },
  computed: {
    ...mapState({
      isLoading: state => state.article.isLoading,
      error: state => state.article.error,
      article: state => state.article.data
    }),
    ...mapGetters({
      currentUser: authGetterTypes.currentUser
    }),
    isAuthor() {
      if (!this.currentUser || !this.article) {
        return false
      }

      return this.currentUser.username === this.article.author.username
    },
    isFavorited: {
      get() {
        return this.article.favorited
      },
      set(value) {
        this.article.favorited = value
      }
    }
  },
  mounted() {
    this.$store.dispatch(articleActionTypes.getArticle, {
      slug: this.$route.params.slug
    })
  },
  methods: {
    deleteArticle() {
      this.$store
        .dispatch(articleActionTypes.deleteArticle, {
          slug: this.$route.params.slug
        })
        .then(() => {
          this.$router.push({name: 'globalFeed'})
        })
    },
    addToFavorite() {
      this.$store.dispatch(addToFavirutesActionTypes.addToFavorites, {
        slug: this.$route.params.slug,
        isFavorited: this.isFavorited
      })

      this.isFavorited
        ? this.article.favoritesCount--
        : this.article.favoritesCount++

      this.isFavorited = !this.isFavorited
    }
  }
}
</script>
