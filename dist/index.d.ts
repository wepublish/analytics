import MatomoTracker from "@jonkoops/matomo-tracker";
declare const tracker: MatomoTracker;
declare const matomoPlugin: () => {
    name: string;
    page: () => void;
    track: () => void;
};
export { tracker, matomoPlugin };
