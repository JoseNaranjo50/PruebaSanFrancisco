const encodeObject = params => {
  let query = [];
  for (let key in params) {
    let val = encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
    query.push(val);
  }
  return query.join("&");
};

const fetchPostService = async (met, url, body, buildInArgs) => {
  let jwtToken = "";
  if (sessionStorage.jwtToken !== undefined)
    jwtToken = "Bearer " + sessionStorage.jwtToken;

  if (met === "get" && body !== undefined) {
    let temp = encodeObject(body);
    url = url + "?" + temp;
  }

    if(buildInArgs && buildInArgs.length > 0)
      url += buildInArgs;

  return await fetch(url, {
    method: met,
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: jwtToken
    }),
    body: met === "get" ? undefined : JSON.stringify(body)
  })
    .then(async response => {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json();
      } else return {};
    })
    .catch(error => Promise.reject(error));
};

export default fetchPostService;
