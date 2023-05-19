import {useContext} from 'react';
import {EventContext} from '../providers/EventProvider';

export function useEventContext() {
  return useContext(EventContext);
}
