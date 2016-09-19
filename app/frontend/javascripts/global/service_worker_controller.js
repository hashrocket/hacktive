class ServiceWorkerController {
  requestPushPermission(){
    if(!('showNotification' in ServiceWorkerRegistration.prototype)){
      return false;
    }

    navigator.serviceWorker.ready.then(function(registration) {
      registration.pushManager.getSubscription()
        .then(function(subscription){
          if(!subscription){
            return registration.pushManager.subscribe({
              applicationServerKey: [1,2,3],
              userVisibleOnly: true
            });
          }

          return subscription;
        }).catch(function(error){
          console.log("failed to get subscription")
        });
    }).then(function(subscription) {
      alert("we did it!")
    }).catch(function(error) {
      console.log("error: ", error)
    });
  }

  start(){
    const self = this;

    if("serviceWorker" in navigator){
      navigator.serviceWorker.register("service_worker.js")
        .then(function(registration){
          self.requestPushPermission();
        }).catch(function(error){
        })
    }
  }

}

export default ServiceWorkerController;