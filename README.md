# WebHook
A demo for WebHooks

### Green Apple 

fake app where you can update the status of the app from browser

  1. Make post request from the browser to localhost:3000/updateStatus using JQuery
  2. When data received on the endpoint on the node server, it makes a post request to a client hook url (localhost:1000/hook)  using node-fetch module 

### Client

An app which has provided the hook url for the update

  1. The hook url is localhost:1000/hook
  2. When status received on the hook, it emits the event using events module
  3. The client browser app get update real time using localhost:1000/stream end point which uses server side events API