const wrapper = promise => (
  promise
    .then(response => ({ response, error: null }))
    .catch(error => ({ error, response: null }))
);

export default wrapper;