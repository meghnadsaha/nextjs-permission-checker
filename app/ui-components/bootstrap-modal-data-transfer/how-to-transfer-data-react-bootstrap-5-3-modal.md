# **How to Build a Simple Next.js 13 App with a Bootstrap Modal That Passes Data In and Out**

This guide will walk you step-by-step through creating a **Next.js 13** application, using **Bootstrap 5.3.3** for styling, and building a **modal** to edit and pass data. It’s geared toward beginners, so we’ll take each step slowly!

---

## **Prerequisites**

1. **Node.js and npm**: Make sure you have Node.js installed (v14 or above is recommended).
2. **Basic Knowledge of JavaScript**: Familiarity with basic JavaScript and React hooks like `useState` will help.

---

## **Step 1: Create a New Next.js 13 Project**

1. Open your **terminal** (Command Prompt, Bash, or PowerShell).
2. Navigate to the folder where you want to create your project.
3. Run the following command:

   ```bash
   npx create-next-app@latest my-bootstrap-modal-app
   ```
   
   - **`my-bootstrap-modal-app`** is the name of the directory where your new app will be created.
   - You might be prompted for a few setup options—feel free to press **Enter** or customize as needed.

4. Once the setup is done, navigate into the project folder:

   ```bash
   cd my-bootstrap-modal-app
   ```

---

## **Step 2: Install Bootstrap**

1. Inside your new project folder, install **Bootstrap 5.3.3**:

   ```bash
   npm install bootstrap
   ```

2. Bootstrap is now included in your project’s `node_modules` folder. We’ll import it later in our code.

---

## **Step 3: Understand the Folder Structure**

Next.js 13 introduces a new **App Router** with a dedicated `app` directory for all your main application pages. The important files/folders to know are:

```
my-bootstrap-modal-app
├── app
│   └── page.js  ← (Main entry file)
├── package.json
├── ...
```

- **`app`**: Contains your application logic and routes.
- **`page.js`**: The default page that will be served when users visit your site’s root URL.

---

## **Step 4: Open Your Project in a Code Editor**

- Use your favorite code editor (VSCode, Atom, WebStorm, etc.).
- Open the project folder **`my-bootstrap-modal-app`**.

---

## **Step 5: Add Bootstrap and Create a Simple Page**

1. In the `app` directory, open **`page.js`**.
2. At the very top, add **`"use client";`** to ensure this file can use React hooks and browser APIs (Next.js 13 requirement for client components).
3. Import Bootstrap’s CSS and React’s `useState` hook.

Your **`page.js`** should look like this initially:

```jsx
"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

export default function Page() {
  return (
    <main className="container py-4">
      <h1>Hello from Next.js + Bootstrap 5.3.3</h1>
    </main>
  );
}
```

4. **Save** the file.

---

## **Step 6: Run the Development Server**

1. Go back to your terminal.
2. Run:

   ```bash
   npm run dev
   ```
3. Open your browser and navigate to **`http://localhost:3000`**.  
   - You should see your heading: **“Hello from Next.js + Bootstrap 5.3.3”**.

---

## **Step 7: Create a Modal Component Inside `page.js`**

We’ll create a **child modal component** in the same file for simplicity. This modal will receive data, allow us to edit it, and then send the updated data back to the **parent**.

1. Still in **`page.js`**, add the following code **above** `export default function Page()`:

   ```jsx
   function MyModal({ initialData, onClose, onSave }) {
     // 1. Store the data passed from the parent.
     const [tempData, setTempData] = React.useState(initialData);

     // 2. When user clicks "Save", trigger the parent’s onSave with the edited data.
     const handleSave = () => {
       onSave(tempData);
     };

     return (
       <div
         className="modal show"
         style={{ display: "block" }}
         tabIndex="-1"
         role="dialog"
       >
         <div className="modal-dialog" role="document">
           <div className="modal-content">
             {/* Modal Header */}
             <div className="modal-header">
               <h5 className="modal-title">Edit Data</h5>
               <button
                 type="button"
                 className="btn-close"
                 aria-label="Close"
                 onClick={onClose}
               />
             </div>

             {/* Modal Body */}
             <div className="modal-body">
               <input
                 type="text"
                 className="form-control"
                 value={tempData}
                 onChange={(e) => setTempData(e.target.value)}
               />
             </div>

             {/* Modal Footer */}
             <div className="modal-footer">
               <button type="button" className="btn btn-secondary" onClick={onClose}>
                 Close
               </button>
               <button type="button" className="btn btn-primary" onClick={handleSave}>
                 Save Changes
               </button>
             </div>
           </div>
         </div>
       </div>
     );
   }
   ```

Here’s what’s happening inside `MyModal`:
- We’re passing down `initialData` from the parent.
- We store that data in `tempData` so we can manipulate it without immediately changing the parent’s state.
- The `handleSave` function calls `onSave(tempData)` to send the updated data back to the parent.

---

## **Step 8: Use the Modal in the Parent Component**

Now we’ll modify the **default export** (the `Page` component) to:
- Keep track of our **main data**.
- Show or hide the modal.
- Handle saving the modal’s updated data.

Replace (or update) the `Page` component code in **`page.js`** with:

```jsx
export default function Page() {
  // 1. Main data in the parent
  const [data, setData] = React.useState("Initial Data");
  // 2. Toggle whether the modal is visible or not
  const [showModal, setShowModal] = React.useState(false);

  // Function to open the modal
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Function to handle saving data from the modal
  const handleSaveData = (updatedData) => {
    setData(updatedData);
    setShowModal(false);
  };

  return (
    <main className="container py-4">
      <h1>Next.js + React + Bootstrap 5.3.3</h1>

      {/* Display the data that will be edited */}
      <p>Current data: <strong>{data}</strong></p>

      {/* Button that opens the modal */}
      <button className="btn btn-primary" onClick={handleOpenModal}>
        Edit Data in Modal
      </button>

      {/* Only render the MyModal component if showModal is true */}
      {showModal && (
        <MyModal
          initialData={data}
          onClose={handleCloseModal}
          onSave={handleSaveData}
        />
      )}
    </main>
  );
}
```

### **Explanation**:
- **`data`**: String variable in the parent that we display on the page.  
- **`showModal`**: Boolean flag that indicates whether to show or hide the modal.  
- **`handleOpenModal`**: Sets `showModal` to `true`, which triggers rendering `<MyModal />`.  
- **`handleSaveData`**: Receives the updated data from the modal and sets it in the parent’s state. Then it closes the modal.  

---

## **Step 9: Test It Out**

1. Make sure your development server is still running (`npm run dev`).
2. Open [http://localhost:3000](http://localhost:3000) in your browser.
3. You should see:
   - **Current data: Initial Data**
   - A button: **“Edit Data in Modal”**.
4. Click **Edit Data in Modal**. A Bootstrap modal should appear.
5. Type something new in the input field.
6. Click **Save Changes**. Notice that the main page’s “Current data” text updates to whatever you typed.

---

## **Step 10: (Optional) Extract the Modal to a Separate File**

If your code gets too large or you prefer better organization, you can create a dedicated file for the modal:

```
app
├── components
│   └── MyModal.js
└── page.js
```

Then import it in your `page.js`:

```jsx
import MyModal from "./components/MyModal";
```

---

## **Summary**

By following these steps, you’ve created a **Next.js 13** application with a **Bootstrap 5.3.3**-styled modal that can:
- Receive **initial data** (like “Initial Data”) from a parent component.
- **Edit** that data inside the modal.
- **Send** the updated data back to the parent.

This basic pattern of **passing data down** as props and **sending updates** back via callback functions is central to React’s component-based architecture. Congratulations on building your first Next.js + Bootstrap modal!

---

### **What Next?**
- Explore more Bootstrap components (e.g., navbars, cards, alerts).
- Experiment with different data types (arrays, objects) and store the changes in state.
- Dive deeper into **React Hooks** and the **Next.js 13 App Router** to build larger, more powerful applications.