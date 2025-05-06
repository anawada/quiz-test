# QA Task

## Description
This project is a QA task for testing using Playwright.

## Installation
To install the necessary dependencies, run:

```bash
npm install
```

## Usage
The main entry point for the project is `huel-quiz.test.js`.

## Testing
To run the tests, use the following command:

```bash
npm test
```

## Notes
- This is a simple test that uses two random answer combinations in order to test the quiz but not overload the servers.
- In a real life scenario a more robust test would be needed. 
- The test was built using codegen from Playwright to map the selectors.
- Then helper functions were used to keep the logic separated making the test more readable and easier to maintain.


