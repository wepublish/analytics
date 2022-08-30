declare const wepublish: () => {
    name: string;
    page: () => void;
    track: (params: any) => void;
};
export { wepublish };
