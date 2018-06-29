import { EventEmitter } from 'events'

export interface Opts {
  url: string,
  protocol?: string[],
  reconnectInterval?: number,
  autoConnect?: boolean,
  maxRetries?: number,
  wsOptions?: object
}

declare class ReconnectWS extends EventEmitter {
  inited: boolean
  ready: boolean
  constructor(opts: Opts)
  connect()
  send(data: any)
  set(key: string, value: any)
  close()
}

export = ReconnectWS
