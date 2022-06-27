import MatomoTracker, { types } from "@jonkoops/matomo-tracker";

const tracker = new MatomoTracker({
  urlBase: "https://editordemowepublishmedia.matomo.cloud/",
  siteId: 1,
});

const matomoPlugin = () => {
  return {
    name: "wp-matomo-analytics",
    page: () => {
      if (typeof window !== "undefined") {
        const peerElement =
          document.querySelector<HTMLElement>("#peer-element");
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
            } as types.TrackParams);
          }
        }
      }
    },
    track: () => {
      if (typeof window !== "undefined") {
        const peerElement =
          document.querySelector<HTMLElement>("#peer-element");
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
      }
    },
  };
};

export { tracker, matomoPlugin };
