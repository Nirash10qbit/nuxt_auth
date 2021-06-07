<template>
  <div>
    <b-row>
      <b-col
        md="4"
        class="mt-3">
        <h5>Two Factor Authontication</h5>
        Add additional security to your account using two factor authontication.
      </b-col>
      <b-col
        md="8"
        class="mt-3">

        <!-- two_factor_enabled -->
        <template v-if="$auth.user.two_factor_enabled">
          <b-card>
            <b-row>
              <b-col md="7">
                <form @submit.prevent="disableTwoFactorAuthentication">
                  <h6>Two factor authentication is enabled.</h6>
                  <div>
                    When two factor authentication is enabled. you will be prompted for a secure. random token during
                    authentication. You may retrieve this token from your phone's Google Authenticator application.
                  </div>
                  <div>
                    <b-button
                      type="submit"
                      variant="outline-primary"
                      class="mt-2">
                      disable
                    </b-button>
                  </div>
                </form>
              </b-col>
              <b-col md="5">
                <div
                  v-if="qrCode"
                  class="my-1 d-flex justify-content-center"
                  v-html="qrCode" />
              </b-col>
            </b-row>
          </b-card>
          <b-card>
            <h6>Recovery Codes</h6>
            <div>
              Use recovery codes to access your account in case you lose your device. and can't use your authentication app.
            </div>
            <b-card class="px-5">
              <ul
                v-if="recoveryCodes"
                class="mb-4">
                <div
                  v-for="(code, index) in recoveryCodes "
                  :key="index">
                  <b-form-checkbox
                    @click.native.stop >
                    {{code}}
                  </b-form-checkbox>
                </div>
              </ul>
            </b-card>
          </b-card>
        </template>

        <!-- two_factor_disabled -->
        <template v-if="!$auth.user.two_factor_enabled">
          <b-card>
            <form @submit.prevent="enableTwoFactorAuthentication">
              <h6>You have not enable two factor authentication.</h6>
              <div>
                When two factor authentication is enabled. you will be prompted for a secure.
                random token during authentication. You may retrieve this token from your phone's
                Google Authenticator application
              </div>
              <b-button
                type="submit"
                variant="outline-primary"
                class="mt-2">
                Enable
              </b-button>
            </form>
          </b-card>
        </template>
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
      qrCode: null,
      recoveryCodes:null,
    }
  },
  methods: {

    async enableTwoFactorAuthentication(){
      await this.$axios.get('sanctum/csrf-cookie')
      await this.$axios.post('user/two-factor-authentication')

      await  this.$auth.fetchUser()

      this.qrCode = (await this.$axios.get('user/two-factor-qr-code')).data.svg
      this.getRecoveryCodes()

    },

    async disableTwoFactorAuthentication(){
      await this.$axios.delete('user/two-factor-authentication')
      await  this.$auth.fetchUser()
    },

    async getRecoveryCodes(){
      this.recoveryCodes = (await this.$axios.get('user/two-factor-recovery-codes')).data
    },

    async mounted() {
      if(this.$auth.user.two_factor_enabled){
        this.getRecoveryCodes()
      }
    }
  }
}
</script>

<style>

</style>
