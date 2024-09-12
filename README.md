  ________  ___  _________  ___  ___  ___  ___  ________          ________ ________  _______   ________   ________      
|\   ____\|\  \|\___   ___\\  \|\  \|\  \|\  \|\   __  \        |\  _____\\   __  \|\  ___ \ |\   ___  \|\   ____\     
\ \  \___|\ \  \|___ \  \_\ \  \\\  \ \  \\\  \ \  \|\ /_       \ \  \__/\ \  \|\  \ \   __/|\ \  \\ \  \ \  \___|_    
 \ \  \  __\ \  \   \ \  \ \ \   __  \ \  \\\  \ \   __  \       \ \   __\\ \   _  _\ \  \_|/_\ \  \\ \  \ \_____  \   
  \ \  \|\  \ \  \   \ \  \ \ \  \ \  \ \  \\\  \ \  \|\  \       \ \  \_| \ \  \\  \\ \  \_|\ \ \  \\ \  \|____|\  \  
   \ \_______\ \__\   \ \__\ \ \__\ \__\ \_______\ \_______\       \ \__\   \ \__\\ _\\ \_______\ \__\\ \__\____\_\  \ 
    \|_______|\|__|    \|__|  \|__|\|__|\|_______|\|_______|        \|__|    \|__|\|__|\|_______|\|__| \|__|\_________\
                                                                                                           \|_________|
                                                                                                                       
                                                                                                                       

Welcome to **Github Frens** — an open-source project designed to connect developers in a fun and engaging way!. The goal is to show a visually appealing interface with interactive node features where users can view other gihub users and repos they have worked with or are currently working with.

## Features

- **User Authentication**: A simple sign-in system with github for users to log in and then view your fellow contrtibutors.
  
- **UI Nodes**: The main UI is composed of a **Node** component which shows the current user github pfp, and the the overview of the contributors when hovered on. the main pfp is connected to a web of toher nodes where each is a project that user has worked with

- **Hover Interaction**: When hovering over the last avatar, a **HoverCard** appears, revealing all the contributors' names and link to their git page.



## Installation

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/OleanjiKingCode/githubfrens.git
   ```
2. Navigate to the project directory:

   ```bash
   cd githubfrens
   ```

3. Install

   ```bash
   yarn 
   ```

4. Start the development server:

   ```bash
   yarn dev
   ```

   Open your browser and visit http://localhost:3000 to see the project running locally.

## Project Structure

Here's a brief overview of the key components within the project:

- **Frens.tsx**: This component is responsible for managing and displaying the list of contributors in the form of avatars, with interactive features like hover effects and scrollable areas.

- **SignIn.tsx**: Handles user authentication, allowing new users to sign in view frens.

- **GitNodes.tsx**: Manages the creation and representation of nodes for each contributor in the UI.

- **ReposNode.tsx**: Logs and tracks the positioning of nodes and avatars in real time, ensuring that interactions like hovering and scrolling are smooth and responsive.

- **types.ts**: Contains TypeScript types used across the project to ensure type safety and consistency in data handling.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them.
4.  Push your changes to your fork.
5.  Create a pull request to the main repository.
6.  Wait for a review to merge your changes.
7.  If you have any questions or need assistance, feel free to reach out to the project maintainers.
8.  Thank you for contributing to the project!
9.  Happy coding!
