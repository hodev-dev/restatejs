// import React from '../../../react-commander-web/node_modules/react';
import React from 'react';

enum statusTypes {
  LOADING,
  SUCCESS,
  FAILED
}

function useController(_controller_group: any, _controller_name: any): [any, statusTypes] {
  const controller = _controller_group.getController(_controller_name);
  const storage = (controller.persist === true) ? _controller_group.storage : undefined;
  var default_counter = _controller_group.getDefault(_controller_name);
  const [state, setState] = React.useState(default_counter);
  const [status, setStatus] = React.useState<statusTypes>(statusTypes.LOADING);

  const getPersist = async () => {
    const item = await storage.load(_controller_name);
    const parsed = JSON.parse(item);
    if (item !== null) {
      setState(parsed);
      setStatus(statusTypes.SUCCESS);
    } else {
      setStatus(statusTypes.FAILED);
    }
  }

  React.useEffect(() => {
    _controller_group.mount(_controller_name);
    return () => {
      _controller_group.unmount(_controller_name);
    }
  }, [])

  React.useEffect(() => {
    _controller_group.connect(_controller_name, setState);
    if (controller.persist === true) {
      getPersist();
    } else {
      setStatus(statusTypes.SUCCESS);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [state, status];
}

export { useController, statusTypes };

