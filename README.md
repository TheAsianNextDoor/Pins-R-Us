# Automate Chrome

<br>

![SpongeBob On SeaHorse gif](images/readme/spongeBobOnSeaHorse.gif)

<br>

## Table of contents

  - [Prerequisites](#prerequisites)
  - [General Info](#general-info)
  - [Supported Websites](#supported-websites)
  - [Directory Information](#directory-information)
  - [Setup](#setup)
  - [Config](#config)
  - [Execution](#execution)
  - [Technologies](#technologies)

<br>

## Prerequisites

[Chrome Browser](https://www.google.com/chrome/) - Browser to run automation on 

[NodeJs](https://nodejs.org/en/) - Javascript runtime engine

[Git](https://git-scm.com/downloads) - Version control system

<br>

## General Info

Automate the Chrome browser using Selenium Web Driver. Offers a framework for interacting with DOM elements. This framework can be used to build scripts that interact with any webpage on the internet. The scripts can be scheduled to execute in the future or immediately. 

Currently automated process:
 - Purchasing hat pins

<br>

## Supported Websites
- Purchasing:
  - Hat Pins:
     1. [Lotu](https://www.lotucreations.com/collections/hat-pins)
     2. [Artistry](https://theartistrycollection.com/collections/2018)
     3. Pookster

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
  
- **buyCommand.js**
  - The root of execution. Receives options, parses, and passes them through to control flow for each website
  
- **buyHelperFunctions.js**
  - Control flow for each website
  - Misc parsing functions for *buyCommand.js*
  
<br>

## Setup
  1. clone repo to local
  2. navigate to local cloned directory
  3. execute command: `npm install` (downloading dependencies)

<br>

## Config
File location: **./src/config.js**

- **item** - name of item to purchase (must escape all quotations with ' \\' character)
- **email** - email to purchase item with  
- **firstName** - first name of purchaser
- **lastName** - last name of purchaser
- **address** - address to ship to
- **city** - city to ship to
- **state** - state to ship to
- **zip** - zip to ship to
- **cardNumber** - card to use for purchase
- **cardNameOn** - the name on the card
- **cardExpirationDate** - the expiration date of the card
- **cardSecurityCode** - the security code of the card

<br>

## Execution

**Commander options:**

- **-w**, **--website [website]** | (required) Which website to purchase on, expects string
- **-u**, **--user [user]** | (required) Which user to purchase item with, expects string
- **-d**, **--date-time [dateTime]** | Execute script at given date time, expects iso 8601 format: *YYYY-MM-DD HH:mm:ss*
- **-n**, **--now** | Execute script immediately, flag variable

*Must pass in either --now or --date-time, not both*

**Examples:**

 - Scheduled script: 
   - `npm run buy -- -w "lotu" --date-time "2020-08-23 14:04:30" -u "user1"` 
   - `npm run buy -- --website "artistry" -dt "2020-08-23 14:04:30" --user "user2"`

- Immediate script: 
  - `npm run buy -- --website "lotu" -n -u "user1"`
  - `npm run buy -- -w "artistry" --now --user "user2"`

<br>

## Technologies
 
Npm modules:
- [selenium-webdriver](https://www.npmjs.com/package/selenium-webdriver)
- [babel](https://www.npmjs.com/package/Babel)
- [eslint](https://www.npmjs.com/package/eslint)
- [async-retry](https://www.npmjs.com/package/async-retry)
- [commander](https://www.npmjs.com/package/commander)
- [moment](https://www.npmjs.com/package/moment)
- [node-schedule](https://www.npmjs.com/package/node-schedule)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [boxen](https://www.npmjs.com/package/boxen)
- [chalk](https://www.npmjs.com/package/chalk)

<br>
