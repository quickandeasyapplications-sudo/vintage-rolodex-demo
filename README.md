# Vintage Rolodex - Nostalgic Digital Contact Manager

## Overview

The Vintage Rolodex is a modern web-based contact management application designed with a nostalgic, old-timey aesthetic. It combines the charm of a classic rolodex with the power and convenience of digital technology, offering a unique and engaging user experience. This application is built using React, providing a responsive and interactive interface accessible across various devices.

## Live Demo

The application is deployed and available at: **[https://quickandeasyapplications-sudo.github.io/vintage-rolodex-demo/](https://quickandeasyapplications-sudo.github.io/vintage-rolodex-demo/)**

## Features

### Core Functionality

*   **Contact Management:** Add, edit, and delete contacts with essential details such as first name, last name, phone, WhatsApp, email, notes, and tags.
*   **Vintage Aesthetic:** A meticulously crafted user interface featuring brass-gold borders, cream paper backgrounds, vintage typography, and decorative elements like card holes and brass frames for profile initials.
*   **Page-Flip Animations:** Smooth and engaging animations for navigating between contact cards, mimicking the physical action of flipping through a traditional rolodex.
*   **Sound Effects:** Auditory feedback for key interactions, including page flips, button clicks, saving, and deleting contacts, enhancing the nostalgic experience. A sound toggle is available to mute/unmute.

### Enhanced Features

*   **Multi-Field Search:** A powerful search bar that queries across all contact fields (first name, last name, email, phone, WhatsApp, notes, and tags) for comprehensive contact retrieval.
*   **Tag Filtering:** Dynamic tag cloud that allows users to filter contacts by one or more associated tags, providing quick access to specific groups of contacts.
*   **Favorites:** Mark contacts as favorites for quick access and filter the contact list to display only favorite contacts.
*   **Alphabetical Navigation:** An interactive alphabetical index at the bottom of the interface for quick jumps to contacts starting with a specific letter.
*   **Robust Import/Export:**
    *   **Export Options:** Export contact data in JSON, CSV, and vCard (.vcf) formats for data portability and backup.
    *   **Import CSV:** Easily import existing contact lists from CSV files into the application.
*   **Click-to-Call/WhatsApp/Email:** Direct interaction buttons on contact cards for initiating calls, WhatsApp chats, or sending emails.

## Installation

To set up the Vintage Rolodex application locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd vintage-rolodex
    ```

2.  **Install dependencies:**
    The project uses `pnpm` as its package manager. If you don't have `pnpm` installed, you can install it via npm:
    ```bash
    npm install -g pnpm
    ```
    Then, install the project dependencies:
    ```bash
    pnpm install
    ```

3.  **Run the development server:**
    ```bash
    pnpm run dev
    ```
    The application will be accessible at `http://localhost:5175/` (or another port if 5175 is in use).

## Usage

Upon launching the application, you will be presented with the main Rolodex interface. You can:

*   **Navigate Contacts:** Use the 

Previous and Next buttons or the alphabetical index to browse through your contacts.
*   **Add New Contact:** Click the floating `+` button at the bottom right to open the Add Contact form. Fill in the details and click "Save Contact".
*   **Edit Contact:** Click the pencil icon on a contact card to edit its details. Make your changes and click "Save Contact".
*   **Delete Contact:** Click the trash can icon on a contact card to delete it.
*   **Mark as Favorite:** Click the star icon to toggle a contact's favorite status.
*   **Search Contacts:** Use the search bar at the top to find contacts by any of their details.
*   **Filter by Tag:** Click on the tag buttons below the search bar to filter contacts by specific tags.
*   **Import/Export Data:** Use the "Export" button to download your contacts in various formats or the "Import CSV" button to upload contacts from a CSV file.
*   **Sound Toggle:** Click the speaker icon at the top right to enable or disable sound effects.

## Project Structure

```
vintage-rolodex/
├── public/
│   ├── sounds/           # Sound effect files
│   └── ...
├── src/
│   ├── assets/          # Static assets like images
│   ├── components/      # Reusable React components
│   │   ├── AddEditContact.jsx
│   │   ├── AlphabetIndex.jsx
│   │   ├── ContactCard.jsx
│   │   └── TagFilter.jsx
│   ├── App.css          # Main application styles
│   ├── App.jsx          # Main application component and logic
│   ├── main.jsx         # Entry point for React application
│   └── ...
├── index.html           # Main HTML file
├── package.json         # Project dependencies and scripts
├── pnpm-lock.yaml
├── README.md            # Project documentation
├── LICENSE.md           # Project license
└── vite.config.js       # Vite configuration
```

## Technologies Used

*   **React:** A JavaScript library for building user interfaces.
*   **Vite:** A fast build tool for modern web projects.
*   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
*   **Shadcn/ui:** A collection of reusable components built with Radix UI and Tailwind CSS.
*   **Lucide React:** A beautiful collection of open-source icons.
*   **Local Storage:** For client-side data persistence.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please feel free to:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/YourFeature`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add new feature'`).
5.  Push to the branch (`git push origin feature/YourFeature`).
6.  Open a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE.md).

## Contact

For any questions or feedback, please contact Manus AI.

