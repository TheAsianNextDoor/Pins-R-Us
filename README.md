# Automate Chrome

<br>

![SpongeBob On SeaHorse gif](https://media.giphy.com/media/3o6ZtbBRPGc1LvF4Na/giphy.gif)

<br>

## Table of contents

  - [General Info](#general-info)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
  - [Supported Websites](#supported-websites)
  - [Config](#config)
  - [Execution](#execution)
  - [Directory Information](#directory-information)
  - [Technologies](#technologies)

<br>

## General Info

Automate the Chrome browser using Selenium Web Driver. Offers a framework for interacting with DOM elements. This framework can be used to build scripts that interact with any webpage on the internet. The scripts can be scheduled to execute in the future or immediately. 

Currently automated process:
 - Purchasing hat pins

<br>

## Prerequisites

[Chrome Browser](https://www.google.com/chrome/) - Browser to run automation on 

[NodeJs](https://nodejs.org/en/) - Javascript runtime engine

[Git](https://git-scm.com/downloads) - Version control system

<br>

## Setup
  1. clone repo to local
  2. navigate to local cloned directory
  3. execute command: `npm install` (downloading dependencies)

<br>

## Supported Websites
- Purchasing:
  - Hat Pins:
     1. [Lotu](https://www.lotucreations.com/collections/hat-pins)
     2. [Artistry](https://theartistrycollection.com/collections/2018)
     3. Pookster

<br>

## Config
File location: **./src/config.js**

Ensure all values are correct before running script

Each primary depth key is used as identification to its user value, which can be references by the commander scripts. The secondary depth keys are used as website, credentials, shipping, and payment information.

- **items** {Array} - name of items to purchase
- **email** {String} - email to purchase item with
- **firstName** {String} - first name of purchaser
- **lastName** {String} - last name of purchaser
- **address** {String} - address to ship to
- **city** {String} - city to ship to
- **state** {String} - state to ship to
- **zip** {String} - zip to ship to
- **cardNumber** {String} - card to use for purchase
- **cardNameOn** {String} - the name on the card
- **cardExpirationDate** {String} - the expiration date of the card. Must be in format with spaces before and after slash `[0-9][0-9] / [0-9][0-9]`
- **cardSecurityCode** {String} - the security code of the card

<br>

## Execution

### Purchase All Items For User

Items to purchase are configured in ./src/config under the "items" key

**Commander options:**

- **-u**, **--user [user]** | (required) Which user to purchase item with, expects string
- **-d**, **--date-time [dateTime]** | Execute script at given date time, expects iso 8601 format: *yyyy-MM-dd HH:mm:ss*
- **-n**, **--now** | Execute script immediately, flag variable

*Must pass in either --now or --date-time, not both*

**Examples:**

 - Scheduled script: 
   - `npm run buyAllItemsForUser -- --date-time "2020-08-23 14:04:30" -u "user1"` 
   - `npm run buyAllItemsForUser -- -dt "2020-08-23 14:04:30" --user "user2"`

- Immediate script: 
  - `npm run buyAllItemsForUser -- -n -u "user1"`
  - `npm run buyAllItemsForUser -- --now --user "user2"`

### Purchase Entire Config

Ensure that every entry in the config file is correct

**Commander options:**

- **-d**, **--date-time [dateTime]** | Execute script at given date time, expects iso 8601 format: *yyyy-MM-dd HH:mm:ss*
- **-n**, **--now** | Execute script immediately, flag variable

*Must pass in either --now or --date-time, not both*

**Examples:**

 - Scheduled script: 
   - `npm run buyEntireConfig -- --date-time "2020-08-23 14:04:30"` 
   - `npm run buyEntireConfig -- -dt "2020-08-23 14:04:30"`

- Immediate script: 
  - `npm run buyEntireConfig -- -n`
  - `npm run buyEntireConfig -- --now`

<br>

## Directory Information

A brief descriptions of important *./src* directories and files:

- **controls**
  - Representations of specific dom elements with interactive Selenium functions 
  - If possible, attempt to keep usages of *actionUtils.js* in these files
  
- **websites**
  - Contains the interactable representations of each website's dom elements
  
- **utilities**
  - actionUtils.js
    - A wrapper for the Selenium action chain
  - byUtils.js
    - A wrapper for the Selenium selector class (wrapping it in an array and adding a position key)
    - Reusable xpath snippets
  - elementUtils.js
    - Locates WebElements and switches frames using the array wrapped selectors
  - retryUtils.js
    - Retry logic that locates WebElements and passes them through to *actionUtils.js* functions
    - Basic retries used for general purpose
  - waitUntilUtils.js
    - Functions that utilize Seleniums wait logic
  
- **buyItemCommand.js**
  - Script for purchasing a single item. Receives options, parses, and passes them through to control flow for each website

- **buyAllItemsForUserCommand.js**
  - Script for purchasing all items for a specific user. Forks the main process and creates a child process with buyItemCommand.js

- **buyEntireConfigCommand.js**
  - Script for purchasing all items for all users in the config file. Forks the main process and creates a child process with buyAllItemsForUserCommand.js
  
- **buyHelperFunctions.js**
  - Control flow for each website
  - Misc parsing functions for commander scripts
  
<br>

## Technologies
 
Npm modules:
- [selenium-webdriver](https://www.npmjs.com/package/selenium-webdriver)
- [babel](https://www.npmjs.com/package/Babel)
- [eslint](https://www.npmjs.com/package/eslint)
- [async-retry](https://www.npmjs.com/package/async-retry)
- [commander](https://www.npmjs.com/package/commander)
- [date-fns](https://www.npmjs.com/package/date-fns)
- [node-schedule](https://www.npmjs.com/package/node-schedule)
- [jsonschema](https://www.npmjs.com/package/jsonschema)
- [bluebird](https://www.npmjs.com/package/bluebird)
- [dotenv-flow](https://www.npmjs.com/package/dotenv-flow)
- [boxen](https://www.npmjs.com/package/boxen)
- [chalk](https://www.npmjs.com/package/chalk)

<br>
