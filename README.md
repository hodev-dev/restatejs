# restatejs

# install
```bash
npm install  @hodev/restatejs
```
Or
```bash
yarn add @hodev/restatejs
```
# How To Use:

- create controllers folder
- make controller
- create group
- add multi controller to the group
- export group

##  make controller

```ts
import { Group, IBasicController, IController, IGroup } from '@hodev/restatejs';

const counterController: IBasicController = {
  name: 'counterController',
  default: 0,
  methods: {
    inc: (controller: IController, group: IGroup, input: any, state: any) => {
      controller.setState(state + 1);
    }
  }
}

const counterGroup: IGroup = new Group(localStorage);

counterGroup.add([counterController]);

export { counterGroup };
```
# React Hoook
import group that you just created
```ts
import { counterGroup } from './controller/counterController';
```
import useController
```ts
import { useController } from '@hodev/restatejs';
```
pass group and name of the controller you wnat to connect
```ts
  const [state,status] = useController(counterGroup, 'counterController');
```
if gives you state and status of state of controller

state has 3 state
- LOADING : 0
- SUCCESS:1
- FAILED: 2

## component will get connected like this
```ts
import { useController } from '@hodev/restatejs';
import React from 'react';
import { counterGroup } from './controller/counterController';

function App() {
  const [counter] = useController(counterGroup, 'counterController');
  return (
    <div className="App">
      <h1>{counter}</h1>
    </div>
  );
}

export default App;

```

# Run Method
group has run() method on it but it has its way to run component method.
as you see first we pass string wich contain name of controller (here is CounterController) and we put method we want to run after `@`
so what it does it searches for counterController inside group and run desired method on that
### inc is function we decleared inside our controller  
```ts
 counterGroup.run('counterController@inc', [], counter);
```

```tsx
import { useController } from '@hodev/restatejs';
import React from 'react';
import { counterGroup } from './controller/counterController';

function App() {
  const [counter] = useController(counterGroup, 'counterController');

  const inc = () => {
    counterGroup.run('counterController@inc', [], counter);
  }
  return (
    <div className="App">
      <h1>{counter}</h1>
      <button onClick={inc}>increament</button>
    </div>
  );
}

export default App;
```

# persist data
to persist data just add persist key to your controller then `restatejs` does the job 
```ts
{
   name: 'counterController',
  "default": 0,
  persist: true, <= here
  methods: {
    inc: (controller: IController, group: IGroup, input: any, state: any) => {
      controller.setState(state + 1);
    }
  }
}
```
# typescirpt

```ts
const {IBasicController, IController, IGroup} from '@hodev/restatejs'
```
typescript is fully supported