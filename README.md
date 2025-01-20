# **MERN Stack Recipe App**

A full-stack web application for food enthusiasts to create, save, and manage recipes. The app features user authentication, recipe management, and a clean, responsive user interface.

Live App: recipe-share-server-brown.vercel.app

---

## **Table of Contents**

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Setup and Installation](#setup-and-installation)
4. [Deployment on Vercel](#deployment-on-vercel)
5. [Usage](#usage)
6. [Project Highlights](#project-highlights)
7. [Challenges and Learnings](#challenges-and-learnings)
8. [Future Improvements](#future-improvements)
9. [Contributing](#contributing)

---

## **Features**

- User registration and login using JWT-based authentication.
- Create, edit, delete, and save recipes.
- Filter recipes by "All" or "Posted by You."
- Responsive design using Bootstrap.
- Integrated "Posted By" information for each recipe.
- Secure interaction between user and recipe collections in MongoDB.

---

## **Tech Stack**

- **Frontend:** React, Bootstrap, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **Deployment:** Vercel

---

## **Setup and Installation**

### **Prerequisites**

- Node.js and npm installed on your system.
- MongoDB account or local MongoDB instance.
- Vercel account for deployment.

### **Installation Steps**

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/recipe-share.git
   cd recipe-share
   ```

2. Install dependencies:

   - For the backend:
     ```bash
     cd backend
     npm install
     ```
   - For the frontend:
     ```bash
     cd frontend
     npm install
     ```

3. Set up environment variables:

   - In the `backend` directory, create a `.env` file and add:
     ```env
     MONGO_URI=your-mongo-db-connection-string
     JWT_SECRET=your-secret-key
     PORT=5000
     ```

4. Start the development servers:

   - Backend:
     ```bash
     npm start
     ```
   - Frontend:
     ```bash
     npm start
     ```

5. Open the app in your browser at `http://localhost:5000`.

---

## **Deployment on Vercel**

### **Steps to Deploy**

1. **Prepare your backend for Vercel:**

   - Ensure your `backend` has a `vercel.json` file to specify the configuration. Example:
     ```json
     {
       "version": 2,
       "builds": [{ "src": "index.js", "use": "@vercel/node" }]
     }
     ```
   - Make sure the `PORT` is dynamic in `server.js`:
     ```js
     const PORT = process.env.PORT || 5000;
     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
     ```

2. **Deploy the backend:**

   - Push the backend code to a separate repository (or a subfolder) on GitHub.
   - Connect the repository to Vercel.
   - Add your environment variables (`MONGO_URI`, `JWT_SECRET`) in Vercel under the **Settings > Environment Variables** section.

3. **Prepare your frontend for Vercel:**

   - Update the `frontend/src/axios.js` file (or wherever your backend URL is specified) to point to the deployed backend URL.
   - Build the React app:
     ```bash
     npm run build
     ```

4. **Deploy the frontend:**

   - Push the frontend code to a GitHub repository.
   - Connect the repository to Vercel.

5. **Finalize the deployment:**
   - Once both the frontend and backend are deployed, test the app to ensure proper communication between the two.

---

## **Usage**

1. Register a new account or log in.
2. Add new recipes with images and descriptions.
3. Save recipes created by other users.
4. Filter recipes by all recipes or those created by you.
5. Edit or delete your recipes.

---

## **Project Highlights**

- **Reusability:** Created reusable components like `RecipeCard` for better maintainability.
- **Database Integration:** Efficiently managed relationships between users and recipes using MongoDB.
- **Dynamic Features:** Filter, count, and display recipes based on user ownership.
- **Enhanced UI/UX:** Used Bootstrap grids and icons for a clean and responsive design.

---

## **Challenges and Learnings**

- **Backend-Frontend Communication:** Debugging mismatched request parameters taught me the importance of consistent API design.
- **Authentication:** Implementing secure login/logout workflows with JWT.
- **Data Relationships:** Using MongoDB to manage relationships between users and recipes.
- **Styling:** Leveraging Bootstrap for a uniform yet appealing visual design.

---

## **Future Improvements**

- Advanced filtering options (e.g., by ingredients or cuisine).
- OAuth support for easier login via Google or Facebook.
- Enhanced mobile responsiveness for smaller devices.
- Real-time updates using WebSockets.

---

## **Contributing**

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.
