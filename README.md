# Outfit Creator Game

This project is a web-based dress-up game that allows users to create custom outfits by mixing and matching different clothing items. The game is built using **Angular**, **Material Angular**, and **TypeScript**. The UI is fully responsive and styled with Material Angular components to provide an engaging user experience.

## Features

- **Drag-and-Drop Clothing Selection:** Users can easily drag and drop clothing items onto a mannequin to create unique outfits.
- **Category-Based Sorting:** Clothing items are sorted by categories (e.g., shirts, pants, shoes) to make it easy for users to browse.
- **Customizable Outfits:** Multiple combinations of clothing items can be added to the mannequin to create the perfect look.
- **Responsive UI:** The game is mobile-friendly and adapts to different screen sizes, making it playable on both desktop and mobile devices.

## Technologies Used

- **Angular:** Used for building the dynamic web application and managing the component-based structure of the project.
- **Material Angular:** For pre-built UI components like buttons, grids, lists, and dialog windows, providing a clean, user-friendly interface.
- **TypeScript:** Strongly typed JavaScript language to ensure type safety and enhance the development experience.
  
## Implementation Details

### Graphics and Clothing Items

The game uses **Angular**'s template-driven approach to dynamically display clothing items. Each clothing item (e.g., shirts, pants, shoes) is represented as an object. Clothing images are displayed using Angular's `img` bindings, and we manage them using a custom service that fetches the images from the assets folder. You can add more clothing items by updating the `ClothingService`.

### UI/UX with Material Angular

We used **Material Angular** components like:

- **Mat-Grid-List**: To arrange clothing items in grids.
- **Mat-Tabs**: For navigation between clothing categories.
- **Mat-Dialog**: To provide feedback or confirmation modals.

### Outfit Management

Users can drag items onto the mannequin using Angular's built-in drag-and-drop module, which allows seamless interaction. When an item is dropped onto the mannequin, the game updates the view in real-time.

### TypeScript for Logic

We leverage **TypeScript** to ensure type safety for all the objects used (e.g., clothing items, outfits) and to keep our logic well-structured. The use of interfaces and classes ensures scalability and maintainability of the game.

### How to Add More Features

If you want to expand this project with more features, you can:

1. Add more clothing categories and items by updating the `ClothingService`.
2. Implement outfit-saving functionality using local storage or backend services.
3. Integrate user accounts to allow saving and sharing outfits online.


