// TODO: This should be provided by the user somehow
let accessToken = '3ffe4a73992d6757364673597f3c1aefa8ab74c3';

export function makeRequest(query, variables) {
  return new Promise((resolve, reject) => {
    fetch(`https://api.github.com/graphql?access_token=${accessToken}`, {
      method: 'POST',
      body: JSON.stringify({
        query,
        variables,
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then((response) => {
      response.json().then(resolve);
    });
  });
}