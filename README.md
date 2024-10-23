# Quiz Application

## Project Description

This is a quiz application built using **Next.js**. The app allows users to select quiz categories, navigate through available questions, and answer them, providing a final score at the end of each quiz. Users also have the option to add custom questions, which are saved locally using `localStorage`.

## Features
- Navigation between categories and quizzes.
- Displaying questions for each quiz.
- Answer validation and score calculation.
- Saving and loading user-added questions from `localStorage`.

## Technologies Used

- **Next.js** for frontend and simple backend functionality.
- **Tailwind CSS** for styling.
- **localStorage** for saving user-added questions.

## Installation and Running Instructions

### 1. Clone the Project

Clone this repository to your local machine:

```bash
git clone https://github.com/username/quiz-app.git
cd quiz-app
```

### 2. Install Dependencies

Make sure you have Node.js and npm installed. Then, install the dependencies:

```bash
npm install
```

### 3. Run the Application

After installing the dependencies, you can start the development server using:

```bash
npm run dev
```

## Branch Structure

* *main*: The main branch that contains production-ready code.
* *module-1*: Defines entities such as Question, Quiz, and Category. It also sets up the basic structure for pages.
* *module-2*: Implements loading questions using Server-Side Rendering.
* *module-3*: Implements dynamic loading of questions using API Routes.
* *improvements*: Contains various refactoring improvements and optimizations.

## How to Contribute

### 1. Clone the repository and create a new branch for your changes:

```bash
git checkout -b feature/your-feature-name
```
### 2. Make your changes and commit them to your branch:

```bash
git commit -m "Clear description of the change"
```

### 3. Push your branch to your repository and create a Pull Request:

```bash
git push origin feature/your-feature-name
```

### 4. Create a Pull Request to the appropriate branch (module-1, module-2, module-3, or improvements) in the main repository.

## Contribution Guidelines
* Ensure your changes are well-tested.
* Follow the existing code style.
* Provide clear descriptions for your changes in the Pull Request.
* Respect commit conventions (e.g., Conventional Commits).
