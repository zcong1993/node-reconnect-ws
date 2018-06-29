import { EventEmitter } from 'events'

declare class ReconnectWS extends EventEmitter {
  inited: boolean
  ready: boolean
  constructor(opts: ReconnectWS.Opts)
  connect()
  send(data: any)
  set(key: string, value: any)
  close()
}

declare namespace ReconnectWS {
  interface Opts {
    url: string,
    protocol?: string[],
    reconnectInterval?: number,
    autoConnect?: boolean,
    maxRetries?: number,
    wsOptions?: object
  }
}

export = ReconnectWS
