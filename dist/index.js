"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matomoPlugin = void 0;
const matomo_tracker_1 = require("@jonkoops/matomo-tracker");
const matomo = new matomo_tracker_1.default({
    siteId: 1,
    urlBase: "https://wpexample2.matomo.cloud/matomo.php",
});
let pageInterval;
let pageTimeout;
let trackInterval;
let trackTimeout;
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
            const findElement = () => {
                const peerElement = document.querySelector("#peer-element");
                if (peerElement !== null) {
                    clearInterval(pageInterval);
                    const peerName = peerElement.dataset.peerName;
                    const peerArticleId = peerElement.dataset.peerArticleId;
                    if (!!(peerName && peerArticleId)) {
                        matomo.trackPageView({
                            href: window.location.href,
                            customDimensions: [
                                {
                                    id: 1,
                                    value: peerArticleId,
                                },
                                {
                                    id: 2,
                                    value: peerName,
                                },
                            ],
                        });
                    }
                }
            };
            pageInterval = setInterval(findElement, 250);
            pageTimeout = setTimeout(() => {
                clearInterval(pageInterval);
            }, 2500);
        },
        track: (params) => {
            if (trackInterval) {
                clearInterval(trackInterval);
            }
            if (trackTimeout) {
                clearTimeout(trackTimeout);
            }
            const findElement = () => {
                const peerElement = document.querySelector("#peer-element");
                if (peerElement !== null) {
                    clearInterval(trackInterval);
                    const peerName = peerElement.dataset.peerName;
                    const peerArticleId = peerElement.dataset.peerArticleId;
                    if (!!(peerName && peerArticleId)) {
                        matomo.trackEvent(Object.assign({ category: "Page view", action: "Peer article viewed" }, params));
                    }
                }
            };
            trackInterval = setInterval(findElement, 250);
            trackTimeout = setTimeout(() => {
                clearInterval(trackInterval);
            }, 2500);
        },
    };
};
exports.matomoPlugin = matomoPlugin;
