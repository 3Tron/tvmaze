# TVmaze test

crawls tvmaze and orders cast by descending birth date.

## Requirements
* mongodb
* nodejs

## Install
```npm install```

## Usage
Configuration can be modified in ```config.js```.
This allows to modify:
* http host
* http port
* mongodb address.

Consists of two runnables, crawler and server

## Crawl TVmaze ###
```npm run crawl```

## Serve the personalized REST API ###
* Start the webserver with ```npm run rest```

The following REST URI are available:
* ```/showcast/[pagenumber]```
* ```/search/[search show name]``` BONUS

## Dev
Written in TypeScript, after modifications run:
 ```npm run build``` or ```npm run bac```
to build it to plain JavaScript run the scraping.

