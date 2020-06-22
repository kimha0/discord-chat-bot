import { Observable } from 'rxjs';
import { getServerList, DNFServers } from '../api/api.servers';

let servers: DNFServers = [];

const observable = new Observable<DNFServers>(subscriber => {
  getServerList()
  .then(serverList => subscriber.next(serverList));
});

observable.subscribe(observer => servers = observer);

export { servers, observable };
