🍕 PizzaShop — modern responsive pizza delivery UI

PizzaShop is a fully responsive, accessible landing page and ordering interface for a pizza-delivery service.
Built with clean SCSS architecture and vanilla JavaScript, it features dynamic modals, cart state management, ingredient customization, and smooth UI interactions.

🚀 Demo

Live: https://lolasommer.github.io/PizzaShop/

(automatically deployed via GitHub Pages)

🧩 Features
🔥 Core functionality

Fully responsive layout (mobile → desktop)

Adaptive SCSS architecture (BEM + partials)

Pixel-perfect implementation of provided design

Smooth animations and transitions

Keyboard accessibility and ARIA attributes for modals

🛒 Cart & ordering

Add pizzas to cart with selected:

size

crust

ingredients

quantity

Smart cart logic:

identical pizzas are merged (same size, crust, ingredients)

dynamic total count & price calculation

Add-on products (extras) with hide/show logic

Removing + updating items with correct UI reactions

🍕 Customization modal

Size selector (10" / 12" / 14")

Traditional / thin crust toggle

Selectable additional ingredients

Real-time price updates

Clean modal state reset on close

Ingredient sorting for safe comparison

🔐 Auth preview modal

Smooth login/signup modal

Icons for Email / Apple / Google / Facebook

Accessible structure with ARIA labels

Animated blurred background

Clean UI fit into project art-direction

🛠 Tech Stack

Frontend

HTML5 semantic structure

SCSS (partials, variables, mixins, components)

JavaScript (DOM events, state management, modular logic)

Build/Tools

GitHub Pages (auto deploy)

Git version control

Lighthouse-optimized (100/100/100/100)

📂 Project Structure
PizzaShop
│
├── css/            # compiled CSS
├── scss/           # SCSS modules (components, blocks, variables)
├── js/             # application logic (modal, cart, state)
├── img/            # assets & sprite
├── index.html      # main entry point
└── README.md

🎯 Planned improvements

Persistent cart using LocalStorage

Promo-code system

Server-side mock API integration

Form validation for login/signup modal

Dark theme toggle

Improved accessibility audit

Unit tests for cart logic

👩‍💻 Author

Developed by LolaSommer — frontend developer focused on clean architecture, UX logic, and detailed UI performance.

⭐ If you like the project

Give it a star — it helps visibility and motivates further development!
