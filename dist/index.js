"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matomoPlugin = void 0;
const MatomoTracker = require("matomo-tracker");
const Cookies = require("js-cookie");
const nanoid = require("nanoid");
const matomo = new MatomoTracker(1, 'https://matomo.wepublish.dev/matomo.php');
let pageInterval;
let pageTimeout;
const cookieName = 'wepublish-matomo';
const matomoPlugin = () => {
    return {
        name: "wp-matomo-analytics",
        page: () => {
            if (pageInterval) {
                clearInterval(pageInterval);
            }
            if (pageTimeout) {
                clearTimeout(pageTimeout);
            }
            pageInterval = setInterval(findElementAndTrack, 250);
            pageTimeout = setTimeout(() => {
                clearInterval(pageInterval);
            }, 2500);
        }
    };
};
exports.matomoPlugin = matomoPlugin;
function findElementAndTrack() {
    const peerElement = document.querySelector("#peer-element");
    if (!peerElement) {
        return;
    }
    clearInterval(pageInterval);
    track(peerElement);
}
function track(peerElement) {
    const peerName = peerElement.dataset.peerName;
    const peerArticleId = peerElement.dataset.peerArticleId;
    const publisherName = peerElement.dataset.publisherName;
    if (!peerElement || !peerArticleId || !publisherName) {
        return;
    }
    const apiv = 1;
    const h = new Date().getHours();
    const m = new Date().getMinutes();
    const s = new Date().getSeconds();
    let action_name;
    let url;
    let urlref;
    let _id;
    let cookie;
    try {
        action_name = document.title;
        url = window.location.href;
        urlref = document.referrer;
        _id = getUniqueVisitorId();
        cookie = canSetCookie();
    }
    catch (e) {
        console.log(e);
    }
    matomo.track({
        url,
        urlref,
        _id,
        apiv,
        action_name,
        h,
        m,
        s,
        send_image: 0,
        cookie,
        res: '',
        pf_net: '',
        pf_srv: '',
        pf_tfr: '',
        pf_dm1: '',
        pf_dm2: '',
        pf_onl: '',
        pv_id: '',
        devicePixelRatio: '',
        'dimension1': peerArticleId,
        'dimension2': peerName,
        'dimension3': publisherName
    });
}
function getUniqueVisitorId() {
    let trackerCookie = Cookies.get(cookieName);
    // if cookie doesn't exist yet, create one
    if (!trackerCookie) {
        createUniqueVisitorCookie();
        trackerCookie = Cookies.get(cookieName);
        if (!trackerCookie) {
            return undefined;
        }
    }
    const trackerCookieObject = JSON.parse(trackerCookie);
    return trackerCookieObject.uniqueVisitorId;
}
function createUniqueVisitorCookie() {
    const uniqueVisitorId = nanoid(30);
    Cookies.set(cookieName, JSON.stringify({ uniqueVisitorId }));
}
function canSetCookie() {
    const testCookieName = 'wep-temp-test-cookie';
    const testCookieValue = 'wep-temp-test-cookie-content';
    Cookies.set(testCookieName, testCookieValue);
    const testCookie = Cookies.get(testCookieName);
    Cookies.remove(testCookieName);
    return testCookie === testCookieValue ? 1 : 0;
}
