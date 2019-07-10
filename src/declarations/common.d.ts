declare module "*.json" {
    const value: any;
    export default value;
}

export interface IContext {

}

export interface IData {
    query: any;
    params: any;
    body: any;
}