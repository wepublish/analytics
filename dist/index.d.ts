declare const matomoPlugin: () => {
    name: string;
    page: () => void;
    track: (params: any) => void;
};
export { matomoPlugin };
