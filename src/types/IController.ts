interface IBasicController {
  name: string,
  default: any,
  methods: any,
  state?: any,
  mount?: boolean,
  persist?: boolean,
  onChange?: () => any,
  setState?: (new_state: any, prev_state?: any, caller?: any) => void,
  getState?: () => any,
  diff?: () => any,
  isEqual?: (prev_state: any, new_state: any) => any,
}
interface IController {
  name: string,
  default: any,
  methods: [],
  state: any,
  mount: boolean,
  persist: boolean,
  onChange?: () => any,
  setState: (new_state: any, prev_state?: any, caller?: any) => void,
  getState: () => any,
  diff: () => any,
  isEqual: (prev_state: any, new_state: any) => any,
}
interface IGroup {
  constructor: Function,
  controllers: any,
  storage: any,
  hook: any,
  add: (controller: Array<IBasicController>) => void,
  connect: (controller_name: string, handler: any) => void,
  run: (method: string, input: any, state: Array<any>) => void,
  getDefault: (controller_name: string) => any,
  getController: (controller_name: string) => IController,
  mount: (controller_name: string) => void,
  unmount: (controller_name: string) => void,
  all: () => void
}

export type { IGroup, IController, IBasicController };

