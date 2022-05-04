/* eslint-disable no-restricted-globals */

// eslint-disable-next-line import/no-anonymous-default-export
export default() => {

  self.onmessage = async function( e ) {
    const response = await something(e)
    const response2 = something2(response)
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