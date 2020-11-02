import { IBasicController, IController, IGroup } from './types/IController';
declare class Group implements IGroup {
    controllers: IController[];
    storage: any;
    hook: any;
    constructor(bridge: any);
    /**
     * add controller to the group to add new properties so it can be used in other controllers
     *
     * @param {Array<IBasicController>} controller
     * @memberof Group
     */
    add(_controller: Array<IBasicController>): void;
    /**
     * select controller in group and run method of that controller
     *
     * @param {*} controller_name
     * ```js
     * controller_name`@`method
     * ````
     * @param {*} input
     * @param {*} states
     * @memberof Group
     */
    run(_method: any, _input: any, _states: any): void;
    connect(_controller_name: any, _handler: any): void;
    getDefault(_controller_name: any): any;
    getController(_controller_name: any): any;
    mount(_controller_name: any): void;
    unmount(_controller_name: any): void;
    all(): void;
}
export { Group };
