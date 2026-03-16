export interface IConfigParams {
    header?: {
        [key: string] : unknown;
    };
    params?: {
        [key: string]: unknown;
    };
}