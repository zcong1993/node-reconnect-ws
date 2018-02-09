import { EventEmitter } from "events"

interface Opts {
  url: string,
  protocol?: string[] | [],
  reconnectInterval?: Number | 4000,
  autoConnect?: boolean | true,
  maxRetries?: Number | Infinity
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
