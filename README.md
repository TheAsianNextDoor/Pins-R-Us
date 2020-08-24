# AutomatedPins

<br>

![SpongeBob Money Bags gif](images/readme/spongeBobMoneyBag.gif)

<br>

## Table of contents

  - [General Info](#general-info)
  - [Supported Websites](#supported-websites)
  - [Directory Information](#directory-information)
  - [Setup](#setup)
  - [Config](#config)
  - [Execution](#execution)
  - [Technologies](#technologies)

<br>
<br>

## General Info

Automate the buying process for pins using Selenium Web Driver. Offers the ability to schedule the script to execute in the future or immediately.

<br>

## Supported Websites

 1. [Lotu](https://www.lotucreations.com/collections/hat-pins)
 2. [Artistry](https://theartistrycollection.com/collections/2018)
 3. Pookster

<br>

## Directory Information

A brief descriptions of important *./src* directories and files:

- **controls**
  - Representations of specific dom elements with interactive Selenium functions 
  - If possible, attept to keep ussages of *actionUtils.js* in these files
  
- **websites**
  - Contains the representations of each website's interactable dom elements
  
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
  - The root of execution. Recieves options, parses, and passes them through to control flow for each website
  
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

<br>

## Technologies

Javascript runtime environment - [Node.js](https://nodejs.org/en/)
 
Npm modules utilized:
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