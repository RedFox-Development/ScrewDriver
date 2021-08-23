# ScrewDriver

Nodejs application to receive transmitted data from RuuviTags and to store to MongoDB Atlas.

Application is meant to be run on [RasPi](https://www.raspberrypi.org/) but should run on other hardware with similar capabilities as well. Works well with Ubuntu Server 20.04 for Raspberry Pi and most likely on Raspberry Pi OS as well.

Frontend dashboard view is served from the application.

---
**NOTE**

For reasons and stuff, I have not been able to tackle slight issue with running without sudo/root. Application might run without it for you, but on my RasPi it doesn't seem to want to and therefore might require sudo/root.

---

## Status

Section | Phase | Needs
--- | --- | ---
Backend/config | done | -
Backend/driver | done(?) | -
Backend/tools/console | done(?) | -
Frontend/UI | early development | dials, texts, layout
GraphQL-API | TBD | ?

## Tech stack

 - Node + Express + node-ruuvitag ( + nodemon on `dev`)

 - Mongoose + MongoDB Apollo

 - React + Redux-Toolkit

## Features

Application backend

Application frontend

Cloud database

(API)

## Usage

### Dev

Running application with `yarn dev` (or `sudo yarn dev`) from the application root directory results application to be run with nodemon so the application can be run and it restarts automatically if any code modification is done and saved.

Alternative would be `NODE_ENV=development nodemon screwdriver.js` on application root directory (or `sudo NODE_ENV=development nodemon screwdriver.js`).

---
**NOTE**

While run in development mode, the measurementCaptureInterval is set by default to 6 seconds. You can set new value by modifying the code itself.

Capability to set interval by using configuration files will be implemented later.

---

### Prod

Running application with `yarn prod` (or `sudo yarn prod`) from the application root directory results application to be run with node and in production mode.

Alternative would be running command `NODE_ENV=production node screwdriver.js` (or `sudo NODE_ENV=production node screwdriver.js`) in the application root directory.

---
**NOTE**

While run in production mode, the measurementCaptureInterval is set by default to 30 seconds. You can set new value by modifying the code itself.

Capability to set interval by using configuration files will be implemented later.

---

### Configuration

#### ENV-file (`.env`)

`.env`-file

#### Whitelist

`.trusted.json`-file.

### Schemas

Following schemas are used to store tags and measurements to MongoDB Atlas (or locally run MongoDB) and they define fields of these data entries.

#### Measurement

```
timestamp: {
  type: Number,
  required: true
},
driver: {
  type: String,
  required: true
},
rssi: {
  type: Number,
  required: true
},
temperature: {
  type: Number,
  required: true
},
humidity: {
  type: Number,
  required: true
},
pressure: {
  type: Number,
  required: true
},
battery: {
  type: Number,
  requires: true
},
tag: {
  type: String,
  required: true
},
measurementSequenceNumber: {
  type: Number,
  required: true
}
```

-- measurement --

#### Tag

```
name: {
  type: String,
  required: true
},
id: {
  type: String,
  required: true,
  unique: true
}
```

Name of the tag has to be set, but it doesn't need to be unique.
ID of the tag has to be set and it has to be unique. ID is the tag's ID (MAC-address without semicolons in lowercase).

