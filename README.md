
## 🍕 PizzaShop — modern responsive pizza delivery UI
This project was built entirely with vanilla JavaScript to demonstrate deep understanding of state management, UI synchronization, and complex user flows without relying on frameworks.


PizzaShop is a fully responsive, accessible landing page and ordering interface for a pizza-delivery service.
Built with clean SCSS architecture and vanilla JavaScript, it focuses on **UI logic, state management, and realistic product behavior** rather than static layouts.

The project simulates a real-world e-commerce flow: product selection, customization, cart management, authentication preview, and multi-page navigation.

---

## 🚀 Demo

**Live:**
[https://lolasommer.github.io/PizzaShop/](https://lolasommer.github.io/PizzaShop/)

(automatically deployed via GitHub Pages)

---

## 🧩 Features

### 🔥 Core functionality

* Fully responsive layout (mobile → desktop)
* Adaptive SCSS architecture (BEM + partials)
* Clean component-based UI structure
* Smooth transitions and micro-interactions
* Keyboard accessibility and ARIA attributes for modals
* Lighthouse optimized (100/100/100/100)

---

## 🛒 Cart & Ordering Logic

* Add pizzas to cart with selected:

  * size
  * crust type
  * ingredients
  * quantity

* Smart cart state management:

  * identical pizzas are merged (same size, crust, ingredients)
  * ingredient lists are sorted for safe comparison
  * dynamic total count & price calculation
  * correct update and removal logic

* Add-on products (extras):

  * dynamic show / hide logic
  * independent quantity handling

* Side cart (slide-in panel):

  * animated open / close
  * body scroll lock handling
  * synchronized UI state across modals

---

## 🍕 Product Details Modal

* Full product information displayed in a modal:

  * pizza image and description
  * size selector (10" / 12" / 14")
  * traditional / thin crust toggle
  * selectable additional ingredients
* Real-time price updates based on selection
* Scrollable ingredients panel (right side)
* Clean modal state reset on close
* Accessible focus handling and keyboard support

---

## 🔐 Authentication (SPA-style preview logic)

The project includes a **single-page authentication flow simulation**, designed as UI/UX and state-logic preview:

* Login & Registration modals
* Registration flow with:

  * email form
  * referral program participation (UI logic)
* Social login buttons:

  * Google
  * Facebook
  * Apple

> Social buttons copy the corresponding social link to clipboard
> and automatically close the modal, simulating a completed action.

* Modal transitions and blurred background
* ARIA-labeled inputs and buttons
* No backend — focus on **frontend logic and UX behavior**

---

## 📰 Blog & Storytelling Page

A separate content-driven page focused on brand storytelling rather than sales:

* Editorial layout with visual hierarchy
* Action-oriented CTA buttons
* Context-aware navigation (no menu/cart logic here)

### Dynamic modals on blog page:

* **Kitchen Tour**

  * interactive modal with booking form
* **Meet the Crew**

  * reused modal with dynamic content injection

These modals share logic but adapt content dynamically based on user action.

---

## 🛠 Tech Stack

### Frontend

* HTML5 (semantic markup)
* SCSS

  * variables, mixins
  * partials and components
  * BEM naming
* Vanilla JavaScript

  * DOM events
  * state management
  * modal orchestration
  * cart logic

### Build / Tools

* Git version control
* GitHub Pages (auto deploy)
* Lighthouse performance optimization

---

## 📂 Project Structure

```
PizzaShop
│
├── css/        # compiled CSS
├── scss/       # SCSS modules (components, blocks, variables)
├── js/         # application logic (modals, cart, state)
├── img/        # assets & sprite
├── index.html  # main entry point
├── blog.html   # storytelling / blog page
└── README.md
```

---

Planned Improvements (Optional / Future Ideas)

The project is considered feature-complete in its current scope.
The following items are optional extensions, not required for the core experience:

Promo-code system (UI logic only)

Mock API integration for product data

Dark theme toggle

Deeper automated testing for cart logic

(LocalStorage persistence and form validation are already implemented.)

---

## 👩‍💻 Author

Developed by **LolaSommer** —
frontend developer focused on **clean architecture, UI logic, and realistic product behavior**.

---

## ⭐ If you like the project

Give it a ⭐ — it helps visibility and motivates further development.

