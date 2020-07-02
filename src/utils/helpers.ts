import * as moment from 'moment';
import { IObject } from 'src/typings/common';

export const parseDataObject = (object: IObject): IObject => JSON.parse(JSON.stringify(object));

export const offset = (page = 1, per_page = 10): number => (page - 1) * per_page;

export const isEmptyObject = (object: IObject): boolean => !Object.keys(object).length;

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

export const sorter = (sort = '-created_at'): string[] => {
    let sortString = sort;
    let sortMethod;

    if (sortString.charAt(0) === '-') {
        sortMethod = 'DESC';
        sortString = sort.substr(1);
    } else {
        sortMethod = 'ASC';
    }

    return [sortString, sortMethod];
};

export const timestamp = (): string => moment().utc().toISOString();

export const spitTrim = (str: string, delimiter = ','): string[] => {
    const strings = str.split(delimiter).map(i => i.trim()).filter(i => i);
    return strings;
};

export default {
    timestamp,
    parseDataObject,
    offset,
    isEmptyArray,
    isEmptyObject,
    trimObjectKey,
    stringifyObjectKey,
    spitTrim
};
