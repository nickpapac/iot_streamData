## `Live streaming Data from WebServer to UI`

Dealing with streams of sensor data. The above solution connects to a data server via web
socket, parses the payload according to the specification and prints CO2 level
changes based on the following rules:
- Two CO2 levels:

“low”: 0-1200 ppm
“high”: > 1200ppm

- Whenever a sensor’s CO2 level changes (e.g. from “low” to “high” or the
other way around), print a message as follows:
“Sensor ${deviceId} level: ${newCo2Level}”
  
- For every battery status (message type 2) print:
“Sensor ${deviceId} battery status:${batteryStatus}V”

### Build & Deploy

``` bash
npm install
```

``` bash
npm run start
```