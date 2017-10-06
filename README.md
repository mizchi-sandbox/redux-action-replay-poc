# redux-action-replay PoC

- Puppeteer automation by redux action log.
- Recorder as redux-middleware
- Get renderer metrics
- Screeshots

## How to try

```sh
$ yarn install
$ webpack-dev-server

```

## Record actions (Optional)

Open http://localhost:3355

![](https://gyazo.com/b8e791077fb87076cd6c99651e4d66c1.gif)

Click `Add 1` and click `Copy to clipboard`

## Run action log in puppeteer

```sh
$ pbpaste > e2e/action-log.json # or default sample
```

Save json to `e2e/action-log.json` from clipboard.

```sh
$ babel-node e2e/automator.js
delta > recording/start { Timestamp: 0.22952799999984563,
  JSEventListenerCount: 10,
  SuspendableObjectCount: 3,
  LayoutCount: 1,
  LayoutDuration: 0.000361999998858664,
  ScriptDuration: 0.00641099999847938,
  TaskDuration: 0.01238599999487636,
  JSHeapUsedSize: 154576 }
delta > counter/add { Timestamp: 0.23178099999859114,
  JSEventListenerCount: 6,
  LayoutCount: 1,
  LayoutDuration: 0.00042100000064237893,
  ScriptDuration: 0.002706999999645631,
  TaskDuration: 0.009463000002142499,
  JSHeapUsedSize: 90728,
  JSHeapTotalSize: 524288 }
delta > counter/add { Timestamp: 0.23287899999922956,
  JSEventListenerCount: 6,
  LayoutCount: 1,
  LayoutDuration: 0.00027200000113225705,
  ScriptDuration: 0.0009859999991021998,
  TaskDuration: 0.004247000000759702,
  JSHeapUsedSize: 45712,
  FirstMeaningfulPaint: 29315.816355 }
delta > counter/add { Timestamp: 0.22857400000066264,
  JSEventListenerCount: 6,
  LayoutCount: 1,
  LayoutDuration: 0.00022400000307242992,
  ScriptDuration: 0.0006299999986367991,
  TaskDuration: 0.003042000000277798,
  JSHeapUsedSize: 40112 }
delta > recording/end { Timestamp: 0.21884900000077323,
  JSEventListenerCount: 14,
  LayoutObjectCount: 7,
  NodeCount: 8,
  LayoutCount: 1,
  RecalcStyleCount: 1,
  LayoutDuration: 0.0026440000001457502,
  RecalcStyleDuration: 0.000191999999515246,
  ScriptDuration: 0.0024610000000393,
  TaskDuration: 0.008716000000276804,
  JSHeapUsedSize: 103224 }
```

See `e2e/screenshots/*.png`

## License

MIT
