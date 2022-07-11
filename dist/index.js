"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matomoPlugin = void 0;
const MatomoTracker = require("matomo-tracker");
const matomo = new MatomoTracker(1, "https://wpexample2.matomo.cloud/matomo.php");
const matomoPlugin = () => {
    return {
        name: "wp-matomo-analytics",
        page: () => {
            const findElement = () => {
                const peerElement = document.querySelector("#peer-element");
                if (peerElement !== null) {
                    clearInterval(check);
                    const peerName = peerElement.dataset.peerName;
                    const peerArticleId = peerElement.dataset.peerArticleId;
                    if (!!(peerName && peerArticleId)) {
                        matomo.track({
                            url: window.location.href,
                            action_name: "Peer article viewed.",
                            dimension3: peerArticleId,
                            dimension4: peerName,
                        });
                    }
                }
            };
            const check = setInterval(findElement, 250);
            setTimeout(() => {
                clearInterval(check);
            }, 2500);
        },
        // track: () => {
        //   const findElement = () => {
        //     const peerElement =
        //       document.querySelector<HTMLElement>("#peer-element");
        //     if (peerElement !== null) {
        //       clearInterval(check);
        //       const peerName = peerElement.dataset.peerName;
        //       const peerArticleId = peerElement.dataset.peerArticleId;
        //       if (!!(peerName && peerArticleId)) {
        //         tracker.trackEvent({
        //           href: window.location.href,
        //           category: `Peer ${peerName} article visited`,
        //           action: `Some action ${peerArticleId}`,
        //         });
        //       }
        //     }
        //   };
        //   const check = setInterval(findElement, 250);
        //   setTimeout(() => {
        //     clearInterval(check);
        //   }, 2500);
        // },
    };
};
exports.matomoPlugin = matomoPlugin;
