// Factory Function to Create Menu Items
export const createMenuItem = (name, price, category, description) => ({ name, price, category, description });

// Menu Items Data
export const menuItems = [
  // Appetizers
  createMenuItem('Bruschetta', '$6.50', 'Appetizers', 'Freshly toasted bread topped with diced tomatoes, basil, and a drizzle of balsamic glaze.'),
  createMenuItem('Stuffed Mushrooms', '$7.00', 'Appetizers', 'Juicy mushrooms filled with a savory mixture of cream cheese, herbs, and garlic.'),
  createMenuItem('Caprese Salad', '$8.00', 'Appetizers', 'A refreshing salad of fresh mozzarella, tomatoes, and basil drizzled with olive oil.'),

  // Main Dishes
  createMenuItem('Grilled Chicken Sandwich', '$10.50', 'Main Dishes', 'Marinated grilled chicken breast served on a toasted bun with lettuce, tomato, and mayo.'),
  createMenuItem('Veggie Burger', '$9.50', 'Main Dishes', 'A hearty black bean and quinoa patty topped with avocado and spicy aioli on a whole grain bun.'),
  createMenuItem('Pasta Primavera', '$12.00', 'Main Dishes', 'Penne pasta tossed with seasonal vegetables in a light garlic and olive oil sauce.'),

  // Desserts
  createMenuItem('Chocolate Lava Cake', '$5.00', 'Desserts', 'A rich chocolate cake with a gooey molten center, served warm with vanilla ice cream.'),
  createMenuItem('Cheesecake', '$4.50', 'Desserts', 'Creamy cheesecake on a graham cracker crust, topped with fresh strawberries.'),
  createMenuItem('Tiramisu', '$5.50', 'Desserts', 'Classic Italian dessert made with layers of coffee-soaked ladyfingers and mascarpone cheese.'),

  // Drinks
  // Espresso
  createMenuItem('Americano', '$4.00', 'Drinks - Espresso', 'A rich espresso diluted with hot water for a smooth finish.'),
  createMenuItem('Cappuccino', '$4.00', 'Drinks - Espresso', 'Espresso topped with steamed milk and frothy foam for a creamy texture.'),

  // Non-Coffee
  createMenuItem('Caramel Macchiato', '$4.50', 'Drinks - Non-Coffee', 'A delightful blend of espresso, steamed milk, vanilla syrup, and caramel drizzle.'),
  createMenuItem('Milk Tea', '$3.50', 'Drinks - Non-Coffee', 'Smooth black tea mixed with milk and sweetened to perfection.'),

  // Tea
  createMenuItem('Hot Tea', '$3.00', 'Drinks - Tea', 'A selection of herbal or black teas served hot for a comforting experience.'),
  createMenuItem('Green Tea', '$3.50', 'Drinks - Tea', 'Refreshing green tea known for its health benefits and light flavor.')
];