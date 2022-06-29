import MatomoTracker, { types } from "@jonkoops/matomo-tracker";

const tracker = new MatomoTracker({
  urlBase: "https://editordemowepublishmedia.matomo.cloud/",
  siteId: 1,
});

const matomoPlugin = () => {
  return {
    name: "wp-matomo-analytics",
    page: () => {
      const findElement = () => {
        const peerElement =
          document.querySelector<HTMLElement>("#peer-element");
        if (peerElement !== null) {
          clearInterval(check);
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
            } as types.TrackParams);
          }
        }
      };

      const check = setInterval(findElement, 250);

      setTimeout(() => {
        clearInterval(check);
      }, 2500);
    },
    track: () => {
      const findElement = () => {
        const peerElement =
          document.querySelector<HTMLElement>("#peer-element");
        if (peerElement !== null) {
          clearInterval(check);
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
      };

      const check = setInterval(findElement, 250);

      setTimeout(() => {
        clearInterval(check);
      }, 2500);
    },
  };
};

export { tracker, matomoPlugin };
