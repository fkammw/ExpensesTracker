# CPRG304D Fall 2023
# Mobile Application Development (CPRG303B)
# Project Phase 4: Building the App
Group 7 - Student Name: 
- Chan, Roselyn
- Kam, Florence
- Li, Yushu

# Expense Tracker App
## Overview
This React Native app is designed to help users track their financial activities, including expenses, incomes, and budgets. It provides a user-friendly interface to add, view, and manage financial records efficiently.

## Features
- Expense Tracking: Log and categorize daily expenses.
- Income Tracking: Record different sources of income.
- Budget Management: Set and monitor monthly budgets.
- Data Filtering: View financial records filtered by months.
- Persistent Storage: Data is saved locally on the device using AsyncStorage.

## Installation
1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies:
```bash
npm install
```
4. Start the application:
```bash
npm run start
```

## Usage
- Overview: Navigate to the 'Overview' tab to view all records of expense and income. On the top of the screen, two buttons can be found: 'Load Test Data' and 'Reset Data'. 'Load Test Data' is for testing the functionalities of the app, where data of the previous months of different categories are included. Users can also use 'Reset Data' button to clear existing data and input their own entries. Records can be filtered according to the month which is selected by the users. Pie charts of expense and income are shown for users to gain a full picture about the proportion of money they earned or spent by categories
- Income: Navigate to the 'Income' tab to add new financial records. Enter details like date, amount, category, and description and click add button. Details of income of the months are available under the 'add' section. Users are allowed to filtered records by month.
- Expense: Navigate to the 'Expense'' tab to add new financial records. Enter details like date, amount, category, and description and click add button. Details of expense of the months are available under the 'add' section. Users are allowed to filtered records by month.
- Setting Budgets: In the 'Budget' tab, set monthly budgets and track expenses against these limits. History of budget and spending for previous months are shown as well.

## Project Structure
- App.jsx: Entry point of the application.
- FinancialDataContext.jsx: Context provider for managing the application's state.
- TestData.jsx: Sample data for testing purposes.
- RecordList.jsx: Component for rendering lists of financial records.
- Home.jsx, Budget.jsx, Expense.jsx, Income.jsx: Components for respective functionalities.

## Additional Notes
1. This app is developed using React Native and tested in the Expo environment.
2. Test data in TestData.jsx is generated with Chatgpt.
3. The data is stored locally.
