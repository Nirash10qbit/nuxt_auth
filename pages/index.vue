<template>
  <div>
    <template v-if="$auth.loggedIn">
      <div>
        <Home />
      </div>
    </template>
    <template
      v-if="!$auth.loggedIn">
      <div>
        <Login />
      </div>
    </template>
  </div>
</template>

<script>
import Login from "./auth/login"
import Home from "./home"
export default {

  components:{
    Login,
    Home,
  },
  methods:{

  }
}
</script>
