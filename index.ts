import * as MatomoTracker from 'matomo-tracker'
import * as Cookies from 'js-cookie'
import nanoid = require('nanoid')

const matomo = new MatomoTracker(1, 'https://matomo.wepublish.dev/matomo.php')
let pageInterval: NodeJS.Timer | number
let pageTimeout: NodeJS.Timeout | number
const cookieName: string = 'wepublish-matomo'

const matomoPlugin = () => {
  return {
    name: "wp-matomo-analytics",
    page: () => {
      if (pageInterval) {
        clearInterval(pageInterval)
      }

      if (pageTimeout) {
        clearTimeout(pageTimeout)
      }
      pageInterval = setInterval(findElementAndTrack, 250)
      pageTimeout = setTimeout(() => {
        clearInterval(pageInterval)
      }, 2500)
    }
  }
}

function findElementAndTrack () {
  const peerElement =
    document.querySelector<HTMLElement>("#peer-element")
  if (!peerElement) {
    return
  }
  clearInterval(pageInterval)
  track(peerElement)
}

function track (peerElement: HTMLElement) {
  const peerName = peerElement.dataset.peerName
  const peerArticleId = peerElement.dataset.peerArticleId
  const publisherName = peerElement.dataset.publisherName

  if (!peerElement || !peerArticleId || !publisherName) {
    return
  }

  let actionName
  let url
  let urlref
  let _id

  try {
    actionName = document.title
    url = window.location.href
    urlref = document.referrer
    _id = getUniqueVisitorId()
  } catch (e) {
    console.log(e)
  }

  matomo.track({
    url,
    urlref,
    _id,
    _idn: '',
    _refts: '',
    _ref: '',
    r: '',
    h: '',
    m: '',
    s: '',
    send_image: '',
    pdf: '',
    qt: '',
    realp: '',
    wma: '',
    fla: '',
    java: '',
    ag: '',
    cookie: '',
    res: '',
    pf_net: '',
    pf_srv: '',
    pf_tfr: '',
    pf_dm1: '',
    pf_dm2: '',
    pf_onl: '',
    pv_id: '',
    devicePixelRatio: '',
    action_name: actionName,

    'dimension1': peerArticleId,
    'dimension2': peerName,
    'dimension3': publisherName
  })
}

function getUniqueVisitorId (): string | undefined {
  let trackerCookie = Cookies.get(cookieName)
  // if cookie doesn't exist yet, create one
  if (!trackerCookie) {
    createUniqueVisitorCookie()
    trackerCookie = Cookies.get(cookieName)
    if (!trackerCookie) {
      return undefined
    }
  }
  const trackerCookieObject = JSON.parse(trackerCookie)
  return trackerCookieObject.uniqueVisitorId
}

function createUniqueVisitorCookie (): void {
  const uniqueVisitorId = nanoid(30)
  Cookies.set(cookieName, JSON.stringify({uniqueVisitorId}))
}

export { matomoPlugin }
