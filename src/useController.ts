import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

function useController(_controller_group: any, _controller_name: any) {
  const types = {
    LOADING: "LOADING",
    SUCCESS: "SUCCESS",
    FAILED: "FAILED"
  }
  var default_counter = _controller_group.getDefault(_controller_name);
  const [state, setState] = useState(default_counter);
  const [status, setStatus] = useState<any>(types);

  const { getItem } = useAsyncStorage(_controller_name);
  const load_persist_state = async () => {
    setStatus(types.LOADING)
    const stored_state = await getItem();
    if (stored_state) {
      setState(JSON.parse(stored_state));
    }
  }

  useEffect(() => {
    _controller_group.connect(_controller_name, setState);
    const _controller = _controller_group.getController(_controller_name);
    if (_controller.persist === true) {
      load_persist_state();
      setStatus(types.SUCCESS)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [state, status];
}
export { useController };
