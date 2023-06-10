import fetchPostService  from "../common/fetchHandler";


export async function getAllStudent() {
  return await fetchPostService(
    "get",
    process.env.REACT_APP_API_STUDENT + "getall",
    null
  )
    .then(result => result)
    .catch(error => error);
}

export async function getAllCourse() {


  return await fetchPostService(
    "get",
    process.env.REACT_APP_API_COURSE + "getallcurso",
    null
  )
    .then(result => result)
    .catch(error => error);
}

export async function getAllRecord() {  
    return await fetchPostService(
      "get",
      process.env.REACT_APP_API_RECORD + "getall",
      null
    )
      .then(result => result)
      .catch(error => error);
}


export async function getSession() {  
    return await fetchPostService(
      "get",
      process.env.REACT_APP_API_SESSION + "get",
      null
    )
      .then(result => result)
      .catch(error => error);
}

export async function addRecord(entity) {
  let body = Object.assign({}, entity);
  body = {
    ...body
  };
  return await fetchPostService("post", process.env.REACT_APP_API_RECORD + "registrarestudiantescurso", body)
    .then(result => result)
    .catch(error => error);
}

export async function deleteRecord(entity) {
  let body = Object.assign({}, entity);
  body = {
    ...body
  };
  return await fetchPostService("delete", process.env.REACT_APP_API_RECORD + "eliminarestudiantescurso", body)
    .then(result => result)
    .catch(error => error);
}

