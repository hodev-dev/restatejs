interface IController {
    constructor: Function;
}
declare class ControllerGroup implements IController {
    controllers: any;
    storage: any;
    hook: any;
    constructor(bridge: any);
    add(_controller: any): void;
    unsubscribe(_controller_name: any): void;
    run(_method: any, _input: any, _states: any): void;
    connect(_controller_name: any, _handler: any): void;
    setState(name: any, new_state: any): void;
    getDefault(_controller_name: any): any;
    getController(_controller_name: any): any;
    getPlatform(): void;
    mount(_controller_name: any): void;
    unmount(_controller_name: any): void;
    all(): void;
}
export { ControllerGroup };
