/* eslint-disable no-restricted-globals */

// eslint-disable-next-line import/no-anonymous-default-export
export default() => {
  // fetch("https://www.naver.com", {
  //         method: "get",
  //         mode: 'no-cors'
  //       })
  // .then(function(response) {
  //     return response.json()
  // })
  // .then(response => {
  //   postMessage(response)
  // })
  // .catch(function(error) {
  //     postMessage(error)
  // });
  self.onmessage = function( e ) {
    
    for (let i = 0; i < e.data.duration; i++) {
      console.time("timer1");
      fetch(e.data.url, {
        method: e.data.method,
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(
          e.data.body
        )
      })
      .then(response => {
        postMessage(response.status)
        return response.json()
      })
      .then(response => {
        console.timeEnd("timer1");
        postMessage(response)
      })
      .catch(error => {
        postMessage(error)
      });
    };
  }

};