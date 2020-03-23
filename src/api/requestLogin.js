const API_URL = process.env.REACT_APP_API_URL;

export function requestLogin({ email, password }) {
  console.log(email, password);
  const data = {
    email: email,
    password: password
  };
  const url = `${API_URL}auth/sign_in`;
  return fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, same-origin, *omit
    headers: {
      "Content-Type": "application/json; charset=utf-8"
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
    body: JSON.stringify(data) // 本文のデータ型は "Content-Type" ヘッダーと一致する必要があります
  })
    .then(response => {
      console.log(response.headers.get("client"));
      console.log(response.headers.get("access-token"));
      return response.json();
    })
    .then(data => console.log(JSON.stringify(data))) // JSON-string from `response.json()` call
    .catch(error => console.error(error));
}
