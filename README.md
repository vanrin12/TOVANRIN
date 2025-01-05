# TOVANRIN
# Problem2

# Currency Swap Form

link demo: http://currency-swap.s3-website-ap-southeast-2.amazonaws.com/
This is a **Currency Swap Form** project built with **React** and **Vite**. The application allows users to swap assets from one currency to another while providing a visually appealing and interactive experience. 

---

## Features

1. **Currency Swap Functionality**:
   - Users can select two currencies (source and target) and input an amount to swap.
   - Displays real-time computed exchange rates using price data from a provided API.

2. **Input Validation & Error Handling**:
   - Ensures valid inputs, such as non-negative amounts.
   - Displays error messages for invalid inputs (e.g., zero or non-numeric values).

3. **Intuitive and Interactive UI**:
   - Visually attractive design for improved user experience.
   - Simulated backend interactions with loading indicators for a realistic feel.

4. **Token Images**:
   - Fetches token icons dynamically from the [Switcheo token repo](https://github.com/Switcheo/token-icons/tree/main/tokens).

5. **Mocked Backend**:
   - Simulates backend processes with timeout delays for actions like submitting a swap.

6. **Performance-Optimized**:
   - Built using [Vite](https://vite.dev/) for fast builds and hot module replacement during development.

7. **Bonus Enhancements**:
   - Shows current exchange rates and reference prices.
   - Omits tokens without available price information.

---

## Getting Started

Follow these steps to set up and run the project on your local machine.

### Prerequisites

- Node.js (v16 or above)
- npm or yarn (package manager)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>

   cd problem2
