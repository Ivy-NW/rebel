![image](https://github.com/user-attachments/assets/5f6082d0-53aa-4a2e-9af7-af75e5bdc672)

# **REBEL**

Welcome to the Financial Advisor app, designed to empower women with personalized financial advice. This app offers a user-friendly web interface and convenient access via USSD, ensuring that financial guidance is just a click or a dial away.

## **Table of Contents**

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
  - [Web Interface](#web-interface)
  - [USSD Access](#ussd-access)
- [Contributing](#contributing)
- [License](#license)

## **Introduction**

This app is created to provide women with tailored financial advice, leveraging the power of the Gemini AI API. The advice covers various financial aspects such as savings, investments, budgeting, and more. Users can interact with the app through a modern web interface or access the services using USSD, making financial advice accessible even without an internet connection.

## **Features**

- **Personalized Financial Advice**: Get customized financial advice using the Gemini API.
- **Responsive Web Interface**: A clean and intuitive HTML and JavaScript-based frontend.
- **USSD Access**: Simple and convenient USSD service powered by Africa's Talking, ensuring access for users without internet connectivity.
- **Focus on Women**: Tailored content and advice specifically designed to meet the financial needs of women.

## **Tech Stack**

- **Frontend**: HTML, JavaScript
- **Backend**: Node.js (or your chosen backend technology)
- **AI Integration**: Google Gemini API
- **USSD Services**: Africa's Talking

## **Installation**

### **Prerequisites**

- Node.js and npm installed on your machine
- Africa's Talking account for USSD integration
- Google Gemini API key

### **Steps**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/financial-advisor.git
   cd financial-advisor
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   - Create a `.env` file in the root directory.
   - Add your Africa's Talking and Gemini API credentials:
     ```bash
     GEMINI_API_KEY=your_gemini_api_key
     AFRICAS_TALKING_USERNAME=your_username
     AFRICAS_TALKING_API_KEY=your_api_key
     ```

4. **Run the application**:
   ```bash
   npm start
   ```

5. **Access the web interface**:
   - Open your browser and navigate to `http://localhost:3000`.

## **Usage**

### **Web Interface**

The web interface is designed for ease of use. Users can access it via their browser to interact with the financial advisor. Here’s how to use it:

1. **Navigate to the homepage**.
2. **Enter your financial query**: Type your financial question or select from predefined options.
3. **Receive advice**: The app will fetch personalized advice using the Gemini API and display it on the screen.

### **USSD Access**

For users without internet access, the USSD service provides a simple way to get financial advice:

1. **Dial the USSD code**: Enter the USSD code provided (e.g., `*123*45#`) on your mobile phone.
2. **Select an option**: Navigate through the menu to choose the type of financial advice you need.
3. **Receive advice**: The app will send you a text message with the advice.

## **Contributing**

We welcome contributions from the community! Feel free to fork the repository, make changes, and submit a pull request. Please ensure your code adheres to our coding standards and includes relevant tests.

## **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

