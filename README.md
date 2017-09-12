
# node-reconnect-ws

[![NPM version](https://img.shields.io/npm/v/node-reconnect-ws.svg?style=flat)](https://npmjs.com/package/node-reconnect-ws) [![NPM downloads](https://img.shields.io/npm/dm/node-reconnect-ws.svg?style=flat)](https://npmjs.com/package/node-reconnect-ws) [![CircleCI](https://circleci.com/gh/zcong1993/node-reconnect-ws/tree/master.svg?style=shield)](https://circleci.com/gh/zcong1993/node-reconnect-ws/tree/master) 

## Install

```bash
yarn add node-reconnect-ws
```

## Usage

```js
const nodeReconnectWs = require('node-reconnect-ws')
const WebSocket = require('ws')

const wsc = new nodeReconnectWs({
  url: url,
  protocol: [],
  webSocket: WebSocket,
  reconnectInterval: 4000,
  autoConnect: true,
  maxRetries: Infinity
})

wsc.on('message', data => console.log(data))
wsc.on('error', err => console.log(err))
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Author

**node-reconnect-ws** © [zcong1993](https://github.com/zcong1993), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by zcong1993 with help from contributors ([list](https://github.com/zcong1993/node-reconnect-ws/contributors)).

> [github.com/zcong1993](https://github.com/zcong1993) · GitHub [@zcong1993](https://github.com/zcong1993)
