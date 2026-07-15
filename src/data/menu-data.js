export const menuCategories = [
  { id: 'all', name: 'All Items', icon: 'Coffee' },
  { id: 'coffee', name: 'Hot & Cold Coffee', icon: 'Feather' },
  { id: 'non-coffee', name: 'Teas & Coolers', icon: 'Leaf' },
  { id: 'pastries', name: 'Sweet Bakery', icon: 'Cake' },
  { id: 'meals', name: 'All-Day Warm Meals', icon: 'Utensils' }
];

export const menuItems = [
  // COFFEE CATEGORY
  {
    id: 'spanish-latte',
    name: 'Sweet Spanish Latte',
    category: 'coffee',
    price: 4.80,
    description: 'Double espresso shots mixed with creamy warm milk and a touch of condensed milk for a perfectly smooth, sweet cup.',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=500',
    tags: ['Best Seller', 'Sweet', 'Highly Recommended', 'Hot or Iced'],
    customizations: {
      sizes: ['Regular Cup', 'Large Cup'],
      milkOptions: ['Regular Milk', 'Oat Milk (+₱25.00)', 'Almond Milk (+₱25.00)'],
      sweetness: ['Normal Sweet', 'Less Sweet', 'Subtle Sugar']
    },
    nutrition: { calories: '240 kcal', protein: '6g', carbs: '32g', fat: '7g' },
    origin: 'Hand-picked beans roasted in Guatemala'
  },
  {
    id: 'vanilla-cold-foam-brew',
    name: 'Vanilla Cold Foam Brew',
    category: 'coffee',
    price: 5.25,
    description: 'Slow-brewed cold coffee topped with a thick, velvety layer of sweet vanilla cream foam.',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=500',
    tags: ['Best Seller', 'Chilled Drink', 'Strong Coffee'],
    customizations: {
      sizes: ['Regular Bottle', 'Large Bottle'],
      sweetness: ['Extra Foam', 'Normal Sweet', 'Less Foam']
    },
    nutrition: { calories: '140 kcal', protein: '2g', carbs: '18g', fat: '5g' },
    origin: 'Smooth blend from South American beans'
  },
  {
    id: 'flat-white',
    name: 'Classic Flat White',
    category: 'coffee',
    price: 4.20,
    description: 'A smooth double shot of rich espresso topped with a thin layer of hot steamed milk.',
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&q=80&w=500',
    tags: ['Classic', 'Creamy', 'Hot Drink'],
    customizations: {
      sizes: ['Standard Size (8oz)'],
      milkOptions: ['Whole Milk', 'Oat Milk (+₱25.00)', 'Almond Milk (+₱25.00)']
    },
    nutrition: { calories: '110 kcal', protein: '5g', carbs: '8g', fat: '4g' },
    origin: 'Eco-friendly beans from Costa Rica'
  },
  {
    id: 'brown-sugar-oat-latte',
    name: 'Brown Sugar Oat Latte',
    category: 'coffee',
    price: 5.10,
    description: 'Rich espresso poured over creamy oat milk, sweetened with house-made brown sugar syrup and a hint of cinnamon.',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80&w=500',
    tags: ['Trending', 'Sweet', 'Hot or Iced', 'Vegan Friendly'],
    customizations: {
      sizes: ['Regular Cup', 'Large Cup'],
      sweetness: ['Normal Sweet', 'Extra Syrup', 'Less Sweet']
    },
    nutrition: { calories: '190 kcal', protein: '3g', carbs: '28g', fat: '5g' },
    origin: 'Ethiopian single-origin espresso beans'
  },
  {
    id: 'caramel-macchiato',
    name: 'Layered Caramel Macchiato',
    category: 'coffee',
    price: 5.50,
    description: 'Freshly steamed milk layered with a bold espresso shot and finished with a drizzle of rich golden caramel sauce.',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=500',
    tags: ['Classic', 'Sweet', 'Guest Favorite', 'Hot or Iced'],
    customizations: {
      sizes: ['Tall (8oz)', 'Grande (12oz)'],
      milkOptions: ['Whole Milk', 'Oat Milk (+₱25.00)', 'Almond Milk (+₱25.00)'],
      sweetness: ['Normal Sweet', 'Less Caramel', 'Extra Caramel']
    },
    nutrition: { calories: '250 kcal', protein: '7g', carbs: '36g', fat: '8g' },
    origin: 'Signature blend from our house roaster'
  },
  {
    id: 'dirty-matcha',
    name: 'Dirty Matcha Espresso',
    category: 'coffee',
    price: 5.70,
    description: 'A bold shot of espresso poured over chilled ceremonial-grade matcha and oat milk — earthy, bold, and very addictive.',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80&w=500',
    tags: ['Trending', 'Chilled Drink', 'Strong Coffee', 'Vegan Friendly'],
    customizations: {
      sizes: ['Regular Cup', 'Large Cup'],
      sweetness: ['No Sweetener', 'Lightly Sweet', 'Normal Sweet']
    },
    nutrition: { calories: '130 kcal', protein: '4g', carbs: '16g', fat: '3.5g' },
    origin: 'Matcha from ceremonial-grade Uji leaves, Japan'
  },

  // NON-COFFEE CATEGORY
  {
    id: 'ceremonial-matcha-latte',
    name: 'Japanese Tea Matcha Latte',
    category: 'non-coffee',
    price: 5.00,
    description: 'Ground green tea leaves whisked smooth and mixed with cold, creamy milk. Rich and full of health benefits.',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&q=80&w=500',
    tags: ['Best Seller', 'Healthy Option', 'Hot or Iced', 'Vegan Friendly'],
    customizations: {
      sizes: ['Regular Cup', 'Large Cup'],
      milkOptions: ['Oat Milk (Best Pick)', 'Almond Milk', 'Whole Milk'],
      sweetness: ['No Sweetener', 'Less Sweet', 'Medium Sweet', 'Fully Sweet']
    },
    nutrition: { calories: '95 kcal', protein: '3g', carbs: '14g', fat: '2.5g' },
    origin: 'Premium green tea custom sourced from Kyoto, Japan'
  },
  {
    id: 'hibiscus-peach-cold-tea',
    name: 'Peach Hibiscus Iced Tea',
    category: 'non-coffee',
    price: 4.45,
    description: 'A chilled herbal flower tea shake blended with sweet peach juice, fresh mint leaves, and a slice of lime.',
    image: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&q=80&w=500',
    tags: ['Caffeine-Free', 'Sweet & Fruity', 'Chilled Drink'],
    customizations: {
      sizes: ['Regular Glass', 'Large Glass'],
      sweetness: ['Sweet', 'Medium Sweet', 'Unsweetened']
    },
    nutrition: { calories: '70 kcal', protein: '0g', carbs: '16g', fat: '0g' },
    origin: 'Dried organic flower petals steeped slowly'
  },
  {
    id: 'ube-latte',
    name: 'Creamy Ube Latte',
    category: 'non-coffee',
    price: 5.20,
    description: 'A vibrant purple Filipino yam latte made with house ube halaya paste and steamed milk — caffeine-free and naturally sweet.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=500',
    tags: ['Local Fave', 'Caffeine-Free', 'Sweet', 'Hot or Iced'],
    customizations: {
      sizes: ['Regular Cup', 'Large Cup'],
      milkOptions: ['Whole Milk', 'Oat Milk (+₱25.00)', 'Coconut Milk (+₱25.00)'],
      sweetness: ['Normal Sweet', 'Less Sweet', 'Extra Ube']
    },
    nutrition: { calories: '175 kcal', protein: '4g', carbs: '28g', fat: '4g' },
    origin: 'House-made ube paste from fresh purple yam'
  },
  {
    id: 'taro-milk-tea',
    name: 'Taro Milk Tea',
    category: 'non-coffee',
    price: 4.90,
    description: 'Creamy taro root blended into a silky smooth milk tea base with chewy tapioca pearls for a satisfying chew.',
    image: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?auto=format&fit=crop&q=80&w=500',
    tags: ['Fan Favorite', 'Caffeine-Free', 'Sweet & Creamy'],
    customizations: {
      sizes: ['Regular (450ml)', 'Large (600ml)'],
      sweetness: ['50% Sweet', '75% Sweet', '100% Sweet']
    },
    nutrition: { calories: '230 kcal', protein: '2g', carbs: '45g', fat: '3g' },
    origin: 'Real taro root blended in-house each morning'
  },
  {
    id: 'strawberry-lemonade',
    name: 'Fresh Strawberry Lemonade',
    category: 'non-coffee',
    price: 4.20,
    description: 'Hand-squeezed lemon juice blended with fresh muddled strawberries, topped with sparkling water and a splash of honey.',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=500',
    tags: ['Refreshing', 'Caffeine-Free', 'Sweet & Fruity', 'Summer Pick'],
    customizations: {
      sizes: ['Regular Glass', 'Large Pitcher (serves 2)'],
      sweetness: ['Lightly Sweet', 'Normal Sweet', 'Extra Honey']
    },
    nutrition: { calories: '85 kcal', protein: '0g', carbs: '21g', fat: '0g' },
    origin: 'Seasonal strawberries sourced from local farms'
  },
  {
    id: 'lavender-honey-latte',
    name: 'Lavender Honey Latte',
    category: 'coffee',
    price: 5.40,
    description: 'Smooth espresso blended with warm steamed milk, fragrant lavender syrup, and a drizzle of wildflower honey on top.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=500',
    tags: ['Trending', 'Floral', 'Hot or Iced'],
    customizations: {
      sizes: ['Regular Cup', 'Large Cup'],
      milkOptions: ['Whole Milk', 'Oat Milk (+₱25.00)', 'Almond Milk (+₱25.00)'],
      sweetness: ['Normal Sweet', 'Less Sweet', 'Extra Honey']
    },
    nutrition: { calories: '210 kcal', protein: '6g', carbs: '30g', fat: '6g' },
    origin: 'Cold-pressed lavender oil blended with house honey syrup'
  },
  {
    id: 'mango-passion-smoothie',
    name: 'Mango Passion Smoothie',
    category: 'non-coffee',
    price: 4.80,
    description: 'Thick blended fresh Carabao mango with a splash of passion fruit juice, lime zest, and a scoop of Greek yogurt.',
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&q=80&w=500',
    tags: ['Caffeine-Free', 'Refreshing', 'Fruity', 'Summer Pick'],
    customizations: {
      sizes: ['Regular (300ml)', 'Large (450ml)'],
      sweetness: ['No Sugar', 'Lightly Sweet', 'Normal Sweet']
    },
    nutrition: { calories: '160 kcal', protein: '4g', carbs: '34g', fat: '1g' },
    origin: 'Farm-fresh Carabao mangoes delivered daily'
  },
  {
    id: 'triple-chocolate-brownie',
    name: 'Triple Chocolate Brownie',
    category: 'pastries',
    price: 4.60,
    description: 'Ultra-fudgy brownie loaded with dark, milk, and white chocolate chips. Crisp on top, gooey in the center — served warm.',
    image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&q=80&w=500',
    tags: ['Sweet Bakery', 'Chocolate Lover', 'Warm Treat'],
    customizations: {
      service: ['Served Warm', 'Room Temperature'],
      toppings: ['Plain', 'Vanilla Ice Cream (+₱30.00)', 'Chocolate Drizzle']
    },
    nutrition: { calories: '420 kcal', protein: '5g', carbs: '52g', fat: '22g' },
    origin: 'Belgian couverture chocolate used in every batch'
  },

  // PASTRIES CATEGORY
  {
    id: 'almond-double-croissant',
    name: 'Warm Almond Croissant',
    category: 'pastries',
    price: 4.50,
    description: 'Freshly baked buttery pastry filled with sweet almond cream, topped with sliced toasted almonds and powdered sugar.',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=500',
    tags: ['Best Seller', 'Contains Nuts', 'Sweet Bakery'],
    customizations: {
      service: ['Served Warm (Highly Recommended!)', 'Served Room Temperature']
    },
    nutrition: { calories: '410 kcal', protein: '8g', carbs: '44g', fat: '21g' },
    origin: 'Baked in our kitchen fresh every morning using quality farm butter'
  },
  {
    id: 'basque-burnt-cheesecake',
    name: 'Burnt Basque Cheesecake',
    category: 'pastries',
    price: 5.80,
    description: 'A super-creamy, crustless baked cheesecake with a rich caramelized top and a tiny pinch of sea salt.',
    image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&q=80&w=500',
    tags: ['Gluten-Free', 'Rich Dessert', 'Guest Favorite'],
    customizations: {
      toppings: ['Plain', 'Vanilla Whipped Cream (+₱15.00)']
    },
    nutrition: { calories: '380 kcal', protein: '6g', carbs: '22g', fat: '28g' },
    origin: 'Freshly baked using farm cream cheese and eggs'
  },
  {
    id: 'classic-tiramisu',
    name: 'Julius Classic Tiramisu',
    category: 'pastries',
    price: 6.20,
    description: 'Layers of espresso-soaked ladyfinger biscuits and mascarpone cream dusted generously with fine cocoa powder.',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=500',
    tags: ['Signature', 'Rich Dessert', 'Contains Coffee'],
    customizations: {
      service: ['One Classic Serving', 'Add Extra Cocoa Dusting']
    },
    nutrition: { calories: '430 kcal', protein: '7g', carbs: '38g', fat: '25g' },
    origin: 'House recipe using Italian mascarpone and espresso'
  },
  {
    id: 'matcha-lava-cake',
    name: 'Matcha Molten Lava Cake',
    category: 'pastries',
    price: 5.60,
    description: 'A warm matcha sponge cake with a flowing white chocolate center. Dusted with powdered sugar and served with vanilla cream.',
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&q=80&w=500',
    tags: ['Seasonal Item', 'Warm Dessert', 'Guest Favorite'],
    customizations: {
      toppings: ['Powdered Sugar Only', 'Vanilla Whipped Cream (+₱15.00)'],
      service: ['Served Warm', 'Served with Ice Cream (+₱30.00)']
    },
    nutrition: { calories: '350 kcal', protein: '5g', carbs: '41g', fat: '17g' },
    origin: 'Japanese matcha powder folded into our house cake batter'
  },
  {
    id: 'cinnamon-roll',
    name: 'Giant Cinnamon Roll',
    category: 'pastries',
    price: 4.80,
    description: 'Pillowy soft spiral roll packed with cinnamon sugar filling, drizzled generously with sweet cream cheese glaze.',
    image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&q=80&w=500',
    tags: ['Sweet Bakery', 'Morning Treat', 'Warm Pastry'],
    customizations: {
      service: ['Served Warm', 'Room Temperature'],
      toppings: ['Classic Cream Cheese Glaze', 'Vanilla Whipped Cream (+₱15.00)']
    },
    nutrition: { calories: '460 kcal', protein: '6g', carbs: '70g', fat: '16g' },
    origin: 'Baked fresh each morning using artisan bread flour'
  },

  // MEALS CATEGORY
  {
    id: 'truffle-wild-mushroom-pasta',
    name: 'Truffle Cream Pasta',
    category: 'meals',
    price: 12.50,
    description: 'Tender pasta loops cooked in a rich truffle cream sauce with sauteed fresh kitchen mushrooms and shaved cheese.',
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&q=80&w=500',
    tags: ['Best Seller', 'Vegetarian friendly', 'Warm Meal'],
    customizations: {
      proteinAdding: ['Keep Plain (Vegetarian)', 'Add Lemon Grilled Chicken (+₱125.00)', 'Add Pan Seared Garlic Shrimp (+₱175.00)'],
      chili: ['No Spice', 'Add Red Chili Flakes']
    },
    nutrition: { calories: '580 kcal', protein: '14g', carbs: '65g', fat: '26g' },
    origin: 'Handmade Italian wheat pasta cooked to order'
  },
  {
    id: 'chicken-pesto-panini',
    name: 'Toasted Chicken Pesto Panini',
    category: 'meals',
    price: 9.80,
    description: 'Grilled chicken breast pieces, juicy roasted tomatoes, spinach, and melted cheese toasted warm on sourdough bread slices.',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=500',
    tags: ['Healthy Meal', 'Warm Toastie', 'Lunch Pick'],
    customizations: {
      choices: ['Artisan Sourdough bread', 'Gluten-Free Bread Option (+₱50.00)'],
      sides: ['Warm Potato Chips', 'Fresh Garden Salad Bowl']
    },
    nutrition: { calories: '490 kcal', protein: '34g', carbs: '42g', fat: '18g' },
    origin: 'Fresh bread delivered from our neighborhood bakery'
  },
  {
    id: 'salmon-rice-bowl',
    name: 'Teriyaki Salmon Rice Bowl',
    category: 'meals',
    price: 13.80,
    description: 'Steamed Japanese short-grain rice topped with pan-seared glazed salmon fillet, pickled ginger, sesame seeds, and house teriyaki drizzle.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=500',
    tags: ['Healthy Meal', 'High Protein', 'Best Seller'],
    customizations: {
      choices: ['White Rice', 'Brown Rice', 'Cauliflower Rice (Low-Carb)'],
      sides: ['Seaweed Salad', 'Miso Soup (+₱50.00)', 'Extra Salmon (+₱175.00)']
    },
    nutrition: { calories: '620 kcal', protein: '38g', carbs: '58g', fat: '22g' },
    origin: 'Atlantic salmon sustainably sourced and glazed in-house'
  },
  {
    id: 'greek-salad-bowl',
    name: 'Classic Greek Salad Bowl',
    category: 'meals',
    price: 8.50,
    description: 'Crisp romaine lettuce, ripe cherry tomatoes, cucumber slices, Kalamata olives, red onion, and a generous block of feta cheese tossed in lemon-herb vinaigrette.',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=500',
    tags: ['Healthy Meal', 'Vegetarian', 'Light Bite', 'Gluten-Free'],
    customizations: {
      proteinAdding: ['Keep Vegetarian', 'Add Lemon Grilled Chicken (+₱125.00)', 'Add Pan Seared Shrimp (+₱175.00)'],
      dressing: ['Classic Lemon-Herb', 'Balsamic Glaze', 'Honey Mustard']
    },
    nutrition: { calories: '290 kcal', protein: '9g', carbs: '18g', fat: '19g' },
    origin: 'Market-fresh vegetables from local farms'
  },
  {
    id: 'spicy-ramen-bowl',
    name: 'Julius Spicy Tonkotsu Ramen',
    category: 'meals',
    price: 11.50,
    description: 'A rich, milky tonkotsu broth with red miso paste, topped with ramen noodles, soft boiled egg, nori, bamboo shoots, and chashu pork belly.',
    image: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?auto=format&fit=crop&q=80&w=500',
    tags: ['Signature', 'Warm Meal', 'Spicy Option'],
    customizations: {
      chili: ['No Spice', 'Mild Heat', 'Medium Spicy', 'Extra Fiery'],
      proteinAdding: ['Chashu Pork (Default)', 'Vegetarian Broth + Tofu']
    },
    nutrition: { calories: '750 kcal', protein: '32g', carbs: '74g', fat: '31g' },
    origin: 'Broth slow-simmered for 12 hours in our in-house kitchen'
  }
];

export const cafeFeatures = [
  {
    id: 'relaxing-atmosphere',
    title: 'Relaxing Vibes',
    description: 'Take a break from work. Our space is decorated with fresh green plants, quiet low music, and comfortable lighting to help you rest.',
    icon: 'Compass',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'student-friendly',
    title: 'Student Discounts',
    description: 'We love students! Show your school ID card to get 15% discount off any food or drink item. We also have large study desks with plug points.',
    icon: 'GraduationCap',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'budget-friendly',
    title: 'Fair Pricing',
    description: 'Great coffee shouldn’t be expensive. We keep our prices low and offer free coffee refills on basic filters when studying.',
    icon: 'Wallet',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'study-space',
    title: 'Individual Study Areas',
    description: 'Select from deep-focus single desks with privacy divider partitions, or sit at shared desks to read with friends.',
    icon: 'BookOpen',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'business-space',
    title: 'Work & Meeting Rooms',
    description: 'Private rooms with solid whiteboard dividers, fast internet connections, and large projection screens for study or video calls.',
    icon: 'Users',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'recreation-space',
    title: 'Games & Rest Corner',
    description: 'Need a rest break? We have a cozy board game library corner with pillow seats, card decks, and comic books for absolute fun.',
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=600'
  }
];

export const additionalServices = [
  {
    title: 'Super Fast Free Wi-Fi',
    description: 'Stay connected at any seat with simple, reliable high-speed Wi-Fi speeds.',
    icon: 'Wifi'
  },
  {
    title: 'Wireless Phone Chargers',
    description: 'Built-in wireless charging circles on every oak study table for easy phone power.',
    icon: 'BatteryCharging'
  },
  {
    title: 'Lendable Tech Gear',
    description: 'Borrow focus headphones, laptop chargers, or bright study lamps from the front desk.',
    icon: 'Headphones'
  },
  {
    title: 'Free Coffee Refills',
    description: 'Order one drip brew mug and get unlimited hot top-ups while you study.',
    icon: 'RefreshCw'
  },
  {
    title: 'Free Fresh Drinking Water',
    description: 'Self-serve fresh cold drinking water dispensers are available in every corner.',
    icon: 'Droplet'
  },
  {
    title: 'Keypad Lockers',
    description: 'Keep your bags safe inside our digital lockers when stepping out to walk.',
    icon: 'Lock'
  }
];
