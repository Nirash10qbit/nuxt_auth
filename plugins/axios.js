export default function ({ $axios, redirect, app}) {

  $axios.onResponse(response => {
    if (response.data.two_factor == true) {
      redirect({path: '/auth/two-factor-challenge'})
    }

  })

  $axios.onError(error => {
    if (error.response.status == 423) {

      redirect({path: '/auth/confirm-password', query: {return: app.router.currentRoute.name}})
    }
  })
}

