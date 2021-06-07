<template>
  <div>
    <b-row>
      <b-col
        md="4"
        class="mt-3">
        <h5>Delete Account</h5>
        <div class="text-warning">
          Deleting your Vapor account does not remove any remaining Vapor
          created resources from your AWS account. You may delete these resources manually
          via the AWS dashboard if you wish.
        </div>
      </b-col>
      <b-col
        md="8"
        class="mt-3">
        <b-card>
          <!-- form -->
          <b-form
            @submit.prevent="deleteAccount">

            <!-- current password -->
            <b-form-group label-for="currentpassword">
              <template v-slot:label>
                Current Password
              </template>
              <b-form-input
                id="currentpassword"
                v-model="form.password"
                type="password"
                :state="this.errors && this.errors.password ? false : null"
                placeholder="Enter current password" />
              <b-form-invalid-feedback
                v-if="errors && errors.password"
                id="currentpassword-feedback">
                {{ errors.password[0] }}
              </b-form-invalid-feedback>
            </b-form-group>

            <!--  Delete button-->
            <div
              class="d-flex justify-content-end">
              <b-button
                type="submit"
                variant="outline-primary"
                class="mt-n2 ml-2">
                delete account
              </b-button>
            </div>
            
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>


<script>

export default {
  layout: 'sticky',
  components: {
  },

  data() {
    return {
      errors:{},
      form: {
        password: '',
      },

    }
  },
  methods: {

    async deleteAccount(){
      try{
        await this.$axios.get('sanctum/csrf-cookie')
        await this.$axios.post('user/confirm-password', this.form)
        await this.$axios.delete('api/user')
        await this.$auth.logout()

        this.$router.replace({path: '/auth/login'})
      } catch (error) {
        if(error.response.status === 422) {
          this.errors = error.response.data.errors;
        }
      }
    },
  }
}
</script>

<style>

</style>
