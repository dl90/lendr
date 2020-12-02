import axios from 'axios'

const URL = 'https://www.lendr-bc.me'

export default {
  axiosPost
}

async function axiosPost (path, payload) {
  return await axios.post(URL + path, {
    ...payload,
    headers: { crossDomain: true }
  }, { withCredentials: true })
}
