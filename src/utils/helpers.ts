import { IObject } from 'src/typings/common';

export const parseDataObject = (object: object): object => JSON.parse(JSON.stringify(object));

export const offset = (page: number = 1, limit: number = 10): number => (page - 1) * limit;

export const isEmptyObject = (object: object): boolean => !Object.keys(object).length;

export const isEmptyArray = (array: any[]): boolean => array.length === 0;

export const trimObjectKey = (object: IObject): IObject => {
    Object.keys(object).forEach(
        (key: string): boolean =>
            (object[key] === null || object[key] === '' || object[key] === undefined) && delete object[key]
    );
    return object;
};

export const stringifyObjectKey = (object: IObject): IObject => {
    Object.keys(object).forEach((key: string): void => {
        object[key] = String(object[key]);
    });
    return object;
};

export default {
    parseDataObject,
    offset,
    isEmptyArray,
    isEmptyObject,
    trimObjectKey,
    stringifyObjectKey
};
