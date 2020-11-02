declare class ControllerStorage {
    types: {
        WEB: number;
        REACT_NATIVE: number;
        NODE: number;
    };
    storage: any;
    platform: any;
    constructor(_storage: any);
    store(_controller_name: any, _value: any): Promise<any>;
    load(_controller_name: any): Promise<any>;
    clear(): Promise<any>;
}
export default ControllerStorage;
