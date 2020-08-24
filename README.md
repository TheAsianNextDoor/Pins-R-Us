# AutomatedPins

## Table of contents

  - [General Info](#general-info)
  - [Technologies](#technologies)
  - [Setup](#setup)
  - [Config](#config)
  - [Supported Websites](#supported-websites)
  - [Execution](#execution)

<br>
<br>

## General Info

Automate the buying process for pins using Selenium Web Driver. Offers the ability to schedule the script to execute in the future or immediately.

<br>

## Technologies

Npm modules utilized:

- [async-retry](https://www.npmjs.com/package/async-retry)
- [boxen](https://www.npmjs.com/package/boxen)
- [chalk](https://www.npmjs.com/package/chalk)
- [commander](https://www.npmjs.com/package/commander)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [moment](https://www.npmjs.com/package/moment)
- [node-schedule](https://www.npmjs.com/package/node-schedule)
- [selenium-webdriver](https://www.npmjs.com/package/selenium-webdriver)
- [babel](https://www.npmjs.com/package/Babel)
- [eslint](https://www.npmjs.com/package/eslint)

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

## Supported Websites

 1. [Lotu](https://www.lotucreations.com/collections/hat-pins)
 2. [Artistry](https://theartistrycollection.com/collections/2018)
 3. Pookster

<br>

## Execution

**Commander options:**

- **-w**, **--website [website]** | (required) Which website to purchase on, expects string
- **-u**, **--user [user]** | (required) Which user to purchase item with, expects string
- **-d**, **--date-time [dateTime]** | Execute script at given date time, expects iso 8601 format
- **-n**, **--now** | Execute script immediately, flag variable

*Must pass in either --now or --date-time, not both*

**Examples:**

 - Scheduled script: 
   - `npm run buy -- -w "lotu" --date-time "2020-08-23 14:04:30" -u "user1"` 
   - `npm run buy -- --website "artistry" -dt "2020-08-23 14:04:30" --user "user2"`

- Immediate script: 
  - `npm run buy -- --website "lotu" -n -u "user1"`
  - `npm run buy -- -w "artistry" --now --user "user2"`
