"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matomoPlugin = exports.tracker = void 0;
const matomo_tracker_1 = require("@jonkoops/matomo-tracker");
const tracker = new matomo_tracker_1.default({
    urlBase: "https://editordemowepublishmedia.matomo.cloud/",
    siteId: 1,
});
exports.tracker = tracker;
const matomoPlugin = () => {
    return {
        name: "wp-matomo-analytics",
        page: () => {
            const peerElement = document.querySelector("#peer-element");
            if (peerElement != null) {
                const peerName = peerElement.dataset.peerName;
                const peerArticleId = peerElement.dataset.peerArticleId;
                if (!!(peerName && peerArticleId)) {
                    tracker.trackPageView({
                        href: window.location.href,
                        data: [
                            {
                                peerName,
                                peerArticleId,
                            },
                        ],
                    });
                }
            }
        },
        track: () => {
            const peerElement = document.querySelector("#peer-element");
            if (peerElement != null) {
                const peerName = peerElement.dataset.peerName;
                const peerArticleId = peerElement.dataset.peerArticleId;
                if (!!(peerName && peerArticleId)) {
                    tracker.trackEvent({
                        href: window.location.href,
                        category: `Peer ${peerName} article visited`,
                        action: `Some action ${peerArticleId}`,
                    });
                }
            }
        },
    };
};
exports.matomoPlugin = matomoPlugin;
