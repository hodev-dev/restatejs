import { isEqual, isPlainObject, reduce } from 'lodash';
import ControllerStorage from './ControllerStorage';
import { useController } from './useController';

export { useController };

export default class ControllerGroup {
  controllers: any;
  storage: any;
  constructor() {
    this.controllers = [];
    this.storage = new ControllerStorage();
  }

  subscribe(_controller: any) {
    _controller.forEach((controller: any) => {
      controller.state = [];
      controller.callHistroy = [];
      controller.connect = (_state: any, _handler: any) => {
        controller.state.push([_state, _handler]);
      }
      controller.pushToCallHistory = (_caller: any) => {
        controller.callHistroy.push(_caller);
        if (controller.callHistroy.length > 5) {
          controller.callHistroy.shift();
        }
      }
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
            handler(_new_state);
          });
        controller.onChange(controller, this, _new_state, _prevState);
      }
      controller.getState = () => {
        return controller.state[0];
      }
      controller.compare = (_prev_state: any, _next_state: any) => {
        return isEqual(_prev_state, _next_state)
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
      this.controllers.push(controller);
    });
  }

  unsubscribe(_controller_name: any) {
    this.controllers
      .filter((_controller: any) => {
        return _controller.name === _controller_name;
      })
      .forEach((_controller: any) => {
        _controller.state = [];
      });
  }
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
  setState(name: any, new_state: any) {
    this.controllers.filter((controller: any) => {
      return controller.name === name;
    }).forEach((controller: any) => {
      controller.onChange(controller, this, new_state);
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
  getPlatform() {
    this.storage.platform;
  }
  all() {
    this.controllers.forEach((controller: any) => console.log(controller));
  }
}

