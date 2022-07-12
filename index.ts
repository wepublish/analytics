import MatomoTracker from "@jonkoops/matomo-tracker";

const matomo = new MatomoTracker({
  siteId: 1,
  urlBase: "https://wpexample2.matomo.cloud",
});

let pageInterval: number;
let pageTimeout: number;
let trackInterval: number;
let trackTimeout: number;

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
        const peerElement =
          document.querySelector<HTMLElement>("#peer-element");
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
        const peerElement =
          document.querySelector<HTMLElement>("#peer-element");
        if (peerElement !== null) {
          clearInterval(trackInterval);
          const peerName = peerElement.dataset.peerName;
          const peerArticleId = peerElement.dataset.peerArticleId;
          if (!!(peerName && peerArticleId)) {
            matomo.trackEvent({
              category: "Page view",
              action: "Peer article viewed",
              ...params,
            });
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

export { matomoPlugin };
