function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

chrome.runtime.onInstalled.addListener(function() {
  
  const uuid = uuidv4();
  chrome.storage.local.get(['wgx_uuid'], function(result) {
    if ( result.wgx_uuid !== undefined ) {
      console.log("installation: existing local uuid is:" + result.wgx_uuid  ) ;  
    } else {
      console.log("installation: new local installation is:" + uuid);
        chrome.storage.local.set({'wgx_uuid': uuid}, function() {
        console.log("uuid locally persisted") ;
      });    
    }    
  });  
  chrome.identity.getProfileUserInfo( userInfo => {
    console.log("user email dans le background:" + userInfo.email ) ;
  }
  );
})


chrome.app.runtime.onLaunched.addListener(function() {
  chrome.storage.local.get(['wgx_uuid'], function(result) {
    console.log("onlaunched: local uuid is:" + result.wgx_uuid  ) ;
  });  
  chrome.app.window.create(
    "index.html",
    {
      id: "appWindow",
      frame: {
        color: "#11575c"
      },
      innerBounds: {
        width: 960,
        height: 540,
        minWidth: 340,
        minHeight: 540
      }
    }
  );
});
