export const handleResponse = (res) => new Promise((resolve, reject) => {
  if (!res.ok) {
    if (res.status == 502) {
      reject({
        status: 502,
        error: 'Bad Gateway',
        res,
      });
    } else if (res.status == 503) {
      reject({
        status: 503,
        error: 'Service Unavailable',
        res,
      });
    } else {
      res.json()
        .then((data) => reject({ ...data }))
        .catch((err) => reject({ ...err }));
    }
  } else {
    res.json().then((data) => resolve(data))
      .catch((err) => reject({ ...err }));
  }
});