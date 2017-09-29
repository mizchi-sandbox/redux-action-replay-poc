# redux-automator PoC

```sh
$ yarn install
$ webpack-dev-server

```

## Record actions

![](https://gyazo.com/b8e791077fb87076cd6c99651e4d66c1.gif)

Controll and click `Copy to clipboard`

## Run action log in puppeteer

```sh
$ pbpaste > e2e/action-log.json # or default sample
```

Save json to `e2e/action-log.json` from clipboard.

## Run automator by puppeteer.

```sh
$ babel-node e2e/automator.js

init @puppeteer/init { Timestamp: 28877.71852,
  AudioHandlerCount: 0,
  DocumentCount: 4,
  FrameCount: 1,
  JSEventListenerCount: 17,
  LayoutObjectCount: 25,
  MediaKeySessionCount: 0,
  MediaKeysCount: 0,
  NodeCount: 51,
  ResourceCount: 4,
  ScriptPromiseCount: 0,
  SuspendableObjectCount: 14,
  V8PerContextDataCount: 1,
  WorkerGlobalScopeCount: 0,
  LayoutCount: 0,
  RecalcStyleCount: 0,
  LayoutDuration: 0,
  RecalcStyleDuration: 0,
  ScriptDuration: 0.00132800000210409,
  TaskDuration: 0.00211099999796716,
  JSHeapUsedSize: 11228656,
  JSHeapTotalSize: 19795968,
  FirstMeaningfulPaint: 0,
  DomContentLoaded: 28877.669859,
  NavigationStart: 28877.499606 }
delta recording/start { Timestamp: 0.5104420000025129,
  JSEventListenerCount: 10,
  SuspendableObjectCount: 3,
  LayoutCount: 1,
  LayoutDuration: 0.000514000003022374,
  ScriptDuration: 0.0080759999982547,
  TaskDuration: 0.02980899999965914,
  JSHeapUsedSize: 154576,
  FirstMeaningfulPaint: 28877.725484 }
delta counter/add { Timestamp: 0.227177999997366,
  JSEventListenerCount: 6,
  LayoutCount: 1,
  LayoutDuration: 0.00029299999732757,
  ScriptDuration: 0.001829000000725509,
  TaskDuration: 0.008879999993951102,
  JSHeapUsedSize: 89816 }
delta counter/add { Timestamp: 0.23850300000049174,
  JSEventListenerCount: 6,
  LayoutCount: 1,
  LayoutDuration: 0.000287000002572316,
  ScriptDuration: 0.000979999997071001,
  TaskDuration: 0.004129000000830198,
  JSHeapUsedSize: 46064 }
delta counter/add { Timestamp: 0.22011100000236183,
  JSEventListenerCount: 6,
  LayoutCount: 1,
  LayoutDuration: 0.0003319999996165299,
  ScriptDuration: 0.0010250000013911006,
  TaskDuration: 0.004497000005358201,
  JSHeapUsedSize: 40112 }
delta recording/end { Timestamp: 0.24471400000038557,
  JSEventListenerCount: 14,
  LayoutObjectCount: 7,
  NodeCount: 8,
  LayoutCount: 1,
  RecalcStyleCount: 1,
  LayoutDuration: 0.00406600000133039,
  RecalcStyleDuration: 0.000213999999687075,
  ScriptDuration: 0.0027190000000700994,
  TaskDuration: 0.0119869999907678,
  JSHeapUsedSize: 103216 }
delta @puppeteer/end { Timestamp: 0.0012629999982891604,
  TaskDuration: 0.00021100000230939858 }

```

See e2e/screenshots/*.png

## License

MIT
