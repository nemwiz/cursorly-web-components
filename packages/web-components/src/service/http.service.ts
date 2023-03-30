export const get = <T>(url: string): Promise<T> => {
  return fetch(url)
    .then(response => response.json())
    .then(response => response as T)
}

export const post = <T, K>(url: string, request: K): Promise<T> => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  }).then(response => response.json())
    .then(response => response as T)
}
