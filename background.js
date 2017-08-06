var parameter = '?share=1';
var parameterRegex = /\?share=1$/;

chrome.webRequest.onBeforeRequest.addListener(function (details) {

    // append parameter only if it isn't previously appended
    if( parameterRegex.test(details.url) === false ){
      return {
        redirectUrl: details.url + parameter
      }
    }

}, {
    urls: ["https://www.quora.com/**"]
}, ["blocking"] );
