import { EventEmitter } from "events"
import ws from 'ws'

interface Opts {
  url: string,
  protocol?: string[] | [],
  webSocket?: WebSocket | ws,
  reconnectInterval?: Number | 4000,
  autoConnect?: boolean | true,
  maxRetries?: Number | Infinity
}

declare class ReconnectWS extends EventEmitter {
  inited: boolean
  constructor(opts: Opts)
  connect()
  send(data: any)
  set(key: string, value: any)
  close()
}

export = ReconnectWS
