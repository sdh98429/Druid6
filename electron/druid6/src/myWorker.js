/* eslint-disable no-restricted-globals */

// eslint-disable-next-line import/no-anonymous-default-export
export default() => {

  self.onmessage = async function( e ) {
    // const requests = []

    // for (let i = 0 ; i < e.data.circulation; i++) {
    //   requests[i]= something(e);
    // }

    // try {
    //   const result = await Promise.all(requests)
    //   result.map((item) => {
    //     console.log(item);
    //   })
    // } catch (error) {
    //   console.log(error);
    // }
    // postMessage('work end');
    // close()

    for (let i = 0 ; i < e.data.circulation; i++) {
      const response = await something(e)
      something2(response)
    }
    postMessage('work end');
    close()

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
    postMessage(e)
    
  }

};