"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackPage = exports.initWepublishAnalytics = void 0;
const MatomoTracker = require("matomo-tracker");
const Cookies = require("js-cookie");
const nanoid = require("nanoid");
const analytics_1 = require("analytics");
const matomo = new MatomoTracker(1, 'https://matomo.wepublish.dev/matomo.php');
let analytics;
let pageInterval;
let pageTimeout;
const cookieName = 'wepublish-matomo';
/**
 * Define analytics plugin
 */
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
/**
 * Searches for a html element with id 'peer-element'. If found, the method inits the tracking.
 */
function findElementAndTrack() {
    const peerElement = document.querySelector("#peer-element");
    if (!peerElement) {
        return;
    }
    clearInterval(pageInterval);
    track(peerElement);
}
/**
 * Sends the tracking request to the matomo instance. Responsible to build the payload, which is sent along.
 * @param peerElement
 */
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
    let res;
    try {
        action_name = document.title;
        url = window.location.href;
        urlref = document.referrer;
        _id = getUniqueVisitorId();
        cookie = canSetCookie();
        res = `${screen.width}x${screen.height}`;
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
        res,
        'dimension1': peerArticleId,
        'dimension2': peerName,
        'dimension3': publisherName
    });
}
/**
 * Tries to retrieve the unique client id from the cookies.
 * If no such id is available as cookie, the function tries to generate a new id.
 * If that new id cannot be stored as cookie, undefined is returned. In that case Matomo fallback gets a turn.
 */
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
/**
 * Generates a unique client id with nanoid and stores it as cookie.
 */
function createUniqueVisitorCookie() {
    const uniqueVisitorId = nanoid(30);
    Cookies.set(cookieName, JSON.stringify({ uniqueVisitorId }));
}
/**
 * Test function to check, whether cookies can be set or not.
 */
function canSetCookie() {
    const testCookieName = 'wep-temp-test-cookie';
    const testCookieValue = 'wep-temp-test-cookie-content';
    Cookies.set(testCookieName, testCookieValue);
    const testCookie = Cookies.get(testCookieName);
    Cookies.remove(testCookieName);
    return testCookie === testCookieValue ? 1 : 0;
}
/**
 * Public interface. Exported members
 */
function initWepublishAnalytics({ appName }) {
    if (!appName) {
        throw new Error('No app name given!');
    }
    analytics = (0, analytics_1.default)({
        app: appName,
        plugins: [matomoPlugin()]
    });
}
exports.initWepublishAnalytics = initWepublishAnalytics;
function trackPage() {
    // call peer view
    analytics.page(matomoPlugin());
}
exports.trackPage = trackPage;
