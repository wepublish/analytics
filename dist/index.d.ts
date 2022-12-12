/**
 * Define analytics plugin
 */
declare const matomoPlugin: () => {
    name: string;
    page: () => void;
};
export declare function initTracking(appName: string): void;
export declare function trackPage(): void;
export { matomoPlugin };
