<template>
  <div>
    <b-row>
      <b-col
        md="4"
        class="mt-3">
        <h5>Password</h5>
        Ensure your account is using a long. random password to stay secure.
        <div class="text-warning">
          Changing your password revokes all existing API Tokens.
        </div>
      </b-col>
      <b-col
        md="8"
        class="mt-3">
        <b-card>
          <!-- form -->
          <template>
            <b-form
              @submit.prevent="updatePassword">

              <!-- current password -->
              <b-form-group label-for="current_password">
                <template v-slot:label>
                  Password
                </template>
                <b-form-input
                  id="password"
                  v-model="form.current_password"
                  type="password"
                  :state="this.errors && this.errors.current_password ? false : null"
                  placeholder="Enter password" />
                <b-form-invalid-feedback
                  v-if="errors && errors.current_password"
                  id="password-feedback">
                  {{ errors.current_password[0] }}
                </b-form-invalid-feedback>
              </b-form-group>


              <!-- password -->
              <b-form-group label-for="password">
                <template v-slot:label>
                  Password
                </template>
                <b-form-input
                  id="password"
                  v-model="form.password"
                  type="password"
                  :state="this.errors && this.errors.password ? false : null"
                  placeholder="Enter password" />
                <b-form-invalid-feedback
                  v-if="errors && errors.password"
                  id="password-feedback">
                  {{ errors.password[0] }}
                </b-form-invalid-feedback>
              </b-form-group>

              <!-- Comfirm password -->

              <b-form-group label-for="input-password">
                <template v-slot:label>
                  Confirmed Password
                </template>
                <b-form-input
                  id="password_confirmation"
                  v-model="form.password_confirmation"
                  type="password"
                  :state="this.errors && this.errors.password_confirmation ? false : null"
                  placeholder="Enter password" />
                <b-form-invalid-feedback
                  v-if="errors && errors.password_confirmation"
                  id="password_confirmation-feedback">
                  {{ errors.password_confirmation[0] }}
                </b-form-invalid-feedback>
              </b-form-group>

              <!-- button-->
              <div
                class="d-flex justify-content-end">
                <b-button
                  type="submit"
                  variant="outline-primary"
                  class="mt-n2 ml-2">
                  Set Password
                </b-button>
              </div>
            </b-form>
          </template>
        </b-card>
      </b-col>
    </b-row>

  </div>
</template>


<script>
export default {
  data(){
    return{
      errors:{},
      form: {
        current_password: '',
        password: '',
        password_confirmation: '',
      }
    }
  },
  methods:{

    async updatePassword() {
      try{
        await this.$axios.get('sanctum/csrf-cookie')
        await this.$axios.put('user/password', this.form)

        await this.$router.replace({path: '/auth/profile/update-password'})
        await this.$router.replace({path: '/auth/profile/'})

      }catch (error) {
        if(error.response.status === 422) {
          this.errors = error.response.data.errors;
        }
        console.log(this.errors)
      }
    },
  }
}
</script>

<style>

</style>


