import { isEqual, isPlainObject, reduce } from 'lodash';
import ControllerStorage from './ControllerStorage';
import { IBasicController, IController, IGroup } from './types/IController';

class Group implements IGroup {
  controllers: IController[];
  storage: any;
  hook: any;
  constructor(bridge: any) {
    this.controllers = [];
    this.storage = new ControllerStorage(bridge);
  }
  /**
   * add controller to the group to add new properties so it can be used in other controllers  
   *
   * @param {Array<IBasicController>} controller
   * @memberof Group
   */
  add(_controller: Array<IBasicController>) {
    _controller.forEach((controller: any) => {
      controller.state = [];
      controller.http = undefined;
      controller.mount = false;
      controller.setState = (_new_state: any, _prevState: any, _caller: any) => {
        controller.state
          .forEach(async (_state: any) => {
            const handler = _state;
            if (controller.persist === true) {
              this.storage.store(controller.name, _new_state);
            } else {
              this.storage.clear();
            }
            controller.default = _new_state;
            if (controller.mount === true) {
              handler(_new_state);
            }
          });
        if (controller.onChange !== undefined) {
          controller.onChange(controller, this, _new_state, _prevState);
        }
      }
      controller.getState = () => {
        return controller.state[0];
      }
      controller.diff = function (_prev_state: any, _new_state: any) {
        return reduce(_prev_state, (result: any, value: any, key: any) => {
          if (isPlainObject(value)) {
            result[key] = this.diff(value, _new_state[key]);
          } else if (!isEqual(value, _new_state[key])) {
            result[key] = { from: value, to: _new_state[key] };
          }
          return result;
        }, {});
      }
      controller.isEqual = (_prev_state, _new_state) => {
        return isEqual(_prev_state, _new_state);
      }
      this.controllers.push(controller);
    });
  }

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
  run(_method: any, _input: any, _states: any) {
    const state_name = _method.substr(0, _method.search('@'));
    const method_name = _method.substr(_method.search('@') + 1, _method.length);
    this.controllers.filter((_controller: any) => {
      return _controller.name === state_name;
    }).forEach((_controller: any) => {
      const method = _controller.methods[method_name];
      method(_controller, this, _input, _states);
    });
  }
  connect(_controller_name: any, _handler: any) {
    this.controllers.filter((controller: any) => {
      return controller.name === _controller_name;
    }).forEach((_controller: any) => {
      _controller.state.push(_handler);
    });
  }
  getDefault(_controller_name: any) {
    let _default;
    this.controllers.filter((controller: any) => {
      return controller.name === _controller_name;
    }).forEach((controller: any) => {
      _default = controller.default;
    });
    return _default;
  }
  getController(_controller_name: any) {
    let _controller;
    this.controllers.filter((controller: any) => {
      return controller.name === _controller_name;
    }).forEach((controller: any) => {
      _controller = controller;
    });
    return _controller;
  }
  mount(_controller_name) {
    this.controllers.filter((controller: any) => {
      return controller.name === _controller_name;
    }).forEach((controller: any) => {
      controller.mount = true;
    });
  }
  unmount(_controller_name) {
    this.controllers.filter((controller: any) => {
      return controller.name === _controller_name;
    }).forEach((controller: any) => {
      controller.mount = false;
    });
  }
  all() {
    this.controllers.forEach((controller: any) => console.log(controller));
  }
}

export { Group };

