class ServiceWorker {
  start(){
    if("serviceWorker" in navigator){
      navigator.serviceWorker.register("service_worker.js")
        .then(function(registration){
          console.log("service worker registered")
        }).catch(function(error){
          console.log("service worker registration failed. error: ", error)
        })
    }
  }

}

export default ServiceWorker;
