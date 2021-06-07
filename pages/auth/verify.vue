<template>
  <div>
    <b-container
      fluid
      class="mt-5">
      <b-row>
        <b-col
          md="4" />
        <b-col
          md="4"
          class="mt-5">

          <div
            class="mb-2 mt-5 d-flex justify-content-center"
            width="30pt"
            height="30pt">
            <img
              src="~/assets/images/logo.png">
          </div>
          <b-card>
            <!-- form -->

            <b-form
              @submit.prevent="resendEmailVerification">

              <div>
                <h5>Email Confirmation</h5>
              </div>
              <div class="mt-n2">
                Hey {{ $auth.user.name }} , you're almost ready to start enjoying Template.
                Please check your email and verify confirmation message
              </div>
              <div>

                <!--  alert-->
                <b-alert
                  variant="white"
                  fade
                  :show="showDismissibleAlert">
                  <div class="text-success ">
                    Please check your Email .....
                  </div>
                </b-alert>
              </div>

              <!-- button-->
              <div class="d-flex justify-content-end">
                <b-button
                  type="submit"
                  variant="primary"
                  class="mt-3">
                  Verify email address
                </b-button>
              </div>
            </b-form>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data(){
    return{
      showDismissibleAlert: false,
    }
  },
  methods:{
    async resendEmailVerification(){
      await this.$axios.post('email/verification-notification')

      this.showDismissibleAlert=true
    }
  }
}
</script>
