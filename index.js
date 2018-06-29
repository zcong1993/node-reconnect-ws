const EventEmitter = require('events')
const WebSocket = require('ws')

/**
 * auto reconnect websocket wrapper
 * @constructor { url, protocol, reconnectInterval, autoConnect }
 * @return {EventEmitter}
 */
class ReconnectWS extends EventEmitter {
  constructor({
    url,
    protocol = [],
    reconnectInterval = 4000,
    autoConnect = true,
    maxRetries = Infinity,
    wsOptions = {}
  } = {}) {
    super()
    this.shouldClose = false
    this.url = url
    this.protocol = protocol
    this.webSocket = WebSocket
    this.reconnectInterval = reconnectInterval
    this.maxRetries = maxRetries
    this.retries = 0
    this.wsOptions = wsOptions
    this.ws = null
    this.notConnectErr = new Error('not connect')
    autoConnect && this.connect()
  }

  /**
   * ws connnection handler
   */
  connect() {
    if (this.retries++ >= this.maxRetries) {
      this.emit('maxRetries', this.maxRetries)
      return console.log(
        `Too many failed connection attempts, ${this.maxRetries}`
      )
    }
    try {
      this.ws = new this.webSocket(this.url, this.protocol, this.wsOptions) // eslint-disable-line new-cap
    } catch (err) {
      !this.shouldClose &&
        setTimeout(() => this.connect(), this.reconnectInterval)
      return this.emit('close', err)
    }
    this.ws.on('open', info => {
      this.retries = 0
      console.log(`socket open`)
      this.emit('open', info)
    })
    this.ws.on('message', data => this.emit('message', data))
    this.ws.on('error', err => this.emit('error', err))
    this.ws.on('close', err => {
      console.log('socket close')
      !this.shouldClose &&
        setTimeout(() => this.connect(), this.reconnectInterval)
      return this.emit('close', err)
    })
  }

  /**
   * proxy of websocket.send()
   * @param {String} data
   */
  send(data) {
    if (!this.inited) {
      throw this.notConnectErr
    }
    try {
      this.ws.send(data)
    } catch (err) {
      this.emit('error', err)
    }
  }

  /**
   * exposed to change proto of websocket instance
   * @param {String} key
   * @param {String} value
   */
  set(key, value) {
    this.ws[key] = value
  }

  /**
   * exit and close ws connection
   */
  close() {
    if (!this.inited) {
      throw this.notConnectErr
    }
    this.shouldClose = true
    this.ws.close()
    console.log('exit...')
  }

  get inited() {
    return Boolean(this.ws)
  }

  get ready() {
    return this.inited && this.ws.readyState === WebSocket.OPEN
  }
}

module.exports = ReconnectWS
