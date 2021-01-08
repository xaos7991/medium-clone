<template>
  <div id="app">
    <McvTopbar />
    <router-view />
  </div>
</template>

<script>
import McvTopbar from '@/components/Topbar'

export default {
  name: 'McvApp',
  components: {
    McvTopbar
  }
}
</script>
