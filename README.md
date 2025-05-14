This repository contains Cypress-based automated tests for both UI interaction and API validation as part of the Airalo Automation Coding Challenge.

Repository Structure

├── cypress/

│   ├── e2e/

│   │   ├── airalo-API.cy.js          # API test script for Airalo

│   │   ├── airalo-ui.cy.js          # UI test script for Airalo

├── api-tests.js                     

├── cypress.config.js  

├── package.json

├── README.md

Overview of Test Cases & Implementation Approach:


UI Automation – Airalo Website
Test Case Steps:
- Launch Airalo Website
- Navigate to https://www.airalo.com.
- Handle cookie and notification prompts.
- Search for "Japan"
- Type "Japan" in the homepage search bar.
- Select the "Japan" entry from the Local section of the autocomplete dropdown.
- Select First eSIM Package
- Click on the first available eSIM package.
- Click "Buy Now" to open the package detail modal.
- Verify eSIM Package Details
- Ensure the modal displays:
  - Title: Moshi Moshi
  - Coverage: Japan
  - Data: 1 GB
  - Validity: 7 Days
  - Price: $4.50 USD



API Automation Test Cases:
- POST Obtain OAuth2 token to access the Airalo Partner API
  -  https://sandbox-partners-api.airalo.com/v2/token
  -  Action: Create a Bearer token use it for the next steps

- POST Order
  - https://sandbox-partners-api.airalo.com/v2/orders
  - Action: Order 6 eSIMs of package merhaba-7days-1gb.

- GET eSIM List
  - https://sandbox-partners-api.airalo.com/v2/esims
  - Action: Fetch list of eSIMs and validate:
    -  There are exactly 6 results
    -  All have slug: merhaba-7days-1gb
    -  Authenticate using OAuth2.
    -  Post an order for 6 merhaba-7days-1gb eSIMs.
    -  Retrieve the list of eSIMs and validate:
      
{
  "package_id": "merhaba-7days-1gb",
  "count": 6
}
Authentication:
POST /oauth/token
{
  "client_id": "7e29e2facf83359855f746fc490443e6",
  "client_secret": "e5NNajm6jNAzrWsKoAdr41WfDiMeS1l6IcGdhmbb"
}


Implementation Notes:
Cypress was used for interaction and validation of DOM elements.
Dropdown filtering scoped to ensure Japan is selected from the Local section only.
Assertions validate both structure and data content.

Cypress Setup & Execution Instructions:
1. Clone the Repository
git clone https://github.com/A-Filip-QA/Airalo-UI-API.git
2. Install Dependencies
Make sure Node.js is installed, then:
npm install
3. Run Cypress (GUI)
npx cypress open
Select the test file: cypress/e2e/airalo-ui.cy.js 
or
4. Run Cypress in Headless Mode from the terminal
npx cypress run --spec "cypress/e2e/api.js"


Tools Used:
- Tool	
- Cypress	
- Node.js
- JavaScript
- Chai
- npm	

👤 Author
Filip Aleksoski

Feel free to fork this repo, submit a PR, or raise issues!
