# camera-permission-info



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description                                                                             | Type      | Default     |
| ----------- | ------------ | --------------------------------------------------------------------------------------- | --------- | ----------- |
| `isFirefox` | `is-firefox` | Hides the continue button on Firefox because Permission API for camera is not supported | `boolean` | `undefined` |


## Events

| Event                     | Description                                            | Type                |
| ------------------------- | ------------------------------------------------------ | ------------------- |
| `permissionInfoContinued` | Emits the event so that the next screen could be shown | `CustomEvent<void>` |


## Dependencies

### Used by

 - [camera-permission](..)

### Graph
```mermaid
graph TD;
  camera-permission --> camera-permission-info
  style camera-permission-info fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

Built by Cursorly
