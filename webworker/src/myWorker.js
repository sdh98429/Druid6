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
  // self.onmessage = async function( e ) {
    
  //   for (let i = 0; i < e.data.duration; i++) {
  //     fetch(e.data.url, {
  //       method: e.data.method,
  //       headers: {
  //         'Content-type': 'application/json'
  //       },
  //       body: JSON.stringify(
  //         e.data.body
  //       )
  //     })
  //     .then(response => {
  //       return response.json()
  //     })
  //     .then(response => {
  //       postMessage(response)
  //     })
  //     .catch(error => {
  //       postMessage(error)
  //     });
  //   };
  // }

  self.onmessage = async function( e ) {
    const response = await something(e)
    const response2  = something2(response)
    console.log('끝')
  }
  
  const something = async(e) => {
    const response = await fetch(e.data.url, {
      method: e.data.method,
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(
        e.data.body
      )
    })
    return response.json()
  }

  const something2 = async(e) => {
    console.log(e)
  }

};