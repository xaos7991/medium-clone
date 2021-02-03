<template>
  <div class="sidebar">
    <p>Popular Tags</p>
    <div class="tag-list" v-if="popularTags && popularTags.length">
      <router-link
        v-for="popularTag in popularTags"
        class="tag-default tag-pill"
        :to="{name: 'tag', params: {slug: popularTag}}"
        :key="popularTag"
      >
        {{ popularTag }}
      </router-link>
    </div>
    <mcv-loading v-if="isLoading" />
    <mvc-error-message v-if="error" />
    <div class="post-preview" v-if="popularTags && !popularTags.length">
      No tags are here... yet.
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/popularTags'
import McvLoading from '@/components/Loading'
import MvcErrorMessage from '@/components/ErrorMessage'

export default {
  name: 'McvPopularTagList',
  components: {
    McvLoading,
    MvcErrorMessage
  },
  computed: {
    ...mapState({
      isLoading: state => state.popularTags.isLoading,
      popularTags: state => state.popularTags.popularTags,
      error: state => state.popularTags.error
    })
  },
  mounted() {
    this.fetchTagList()
  },
  methods: {
    fetchTagList() {
      this.$store.dispatch(actionTypes.getPopularTags)
    }
  }
}
</script>
