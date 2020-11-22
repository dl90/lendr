import axios from 'axios'
// import toughCookie from 'tough-cookie'
// import axiosCookieJarSupport from 'axios-cookiejar-support'

// axiosCookieJarSupport(axios)
// const cookieJar = new toughCookie.CookieJar()
// const Cookie = toughCookie.Cookie

export default {
  axiosPost
}

async function axiosPost (path, payload) {
  const res = await axios.post(`https://www.lendr-bc.me${path}`, {
    ...payload,
    // jar: cookieJar,
    headers: { crossDomain: true }
  }, { withCredentials: true })

  // console.log(cookieJar)
  // let cookies = ''
  // if (res.headers['set-cookie'] instanceof Array)
  //   cookies = res.headers['set-cookie'].map(Cookie.parse);
  // else
  //   cookies = [Cookie.parse(res.headers['set-cookie'])];

  // cookieJar.setCookie(cookies, 'https://www.lendr-bc.me', (err, cookie) => {
  //   console.log(cookie)
  // })

  // cookieJar.getCookies('https://www.lendr-bc.me', (err, cookie) => {
  //   console.log(cookie)
  // })

  return res
}

