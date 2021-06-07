<template>
  <div>
    <b-container
      fluid
      md="8"
      class="mt-3">
      <div><UpdateFrofile /></div>
      <div><UpdatePassword /></div>
      <div><TwoFactor /></div>
      <div><Delete /></div>
    </b-container>
  </div>
</template>

<script>
 import UpdateFrofile from '~/pages/auth/profile/update-profile';
 import Delete from "~/pages/auth/profile/delete";
 import  TwoFactor from "~/pages/auth/profile/two-factor";
 import  UpdatePassword from "~/pages/auth/profile/update-password";

export default {
  layout: 'sticky',
  components: {
    UpdateFrofile,
    Delete,
    TwoFactor,
    UpdatePassword,
  },

  data() {
    return {
    }
  },
  methods: {

  }
}
</script>

<style>

</style>
