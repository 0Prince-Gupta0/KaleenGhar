// ================= AUTH FORMS =================

export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

// ================= ADMIN : ADD / EDIT PRODUCT =================
// Matches Product Schema exactly

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "handtufedCarpet", label: "Hand Tufted Carpet" },
      { id: "shaggyCarpet", label: "Shaggy Carpet" },
    ],
  },
  {
    label: "Color",
    name: "color",
    componentType: "select",
    options: [
      { id: "red", label: "Red" },
      { id: "blue", label: "Blue" },
      { id: "black", label: "Black" },
    ],
  },
  {
    label: "Size",
    name: "size",
    componentType: "select",
    options: [
      { id: "3x6", label: "3 x 6" },
      { id: "5x7", label: "5 x 7" },
      { id: "7x10", label: "7 x 10" },
    ],
  },
  {
    label: "Shape",
    name: "shape",
    componentType: "select",
    options: [
      { id: "rectangle", label: "Rectangle" },
      { id: "square", label: "Square" },
    ],
  },
  {
    label: "Material",
    name: "material",
    componentType: "select",
    options: [
      { id: "wool", label: "Wool" },
      { id: "silk", label: "Silk" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

// ================= SHOP HEADER MENU =================

export const shoppingViewHeaderMenuItems = [
  { id: "home", label: "Home", path: "/shop/home" },

  {
    id: "category",
    label: "Shop By Category",
    dropdownKey: "category",
  },
  {
    id: "color",
    label: "Shop By Color",
    dropdownKey: "color",
  },
  {
    id: "size",
    label: "Shop By Size",
    dropdownKey: "size",
  },
  {
    id: "shape",
    label: "Shop By Shape",
    dropdownKey: "shape",
  },
  {
    id: "material",
    label: "Shop By Material",
    dropdownKey: "material",
  },

  { id: "search", label: "Search", path: "/shop/search" },
];


// ================= FILTER OPTIONS =================
// Field names MUST match Mongo schema

export const filterOptions = {
  category: [
    { id: "handtufedCarpet", label: "Hand Tufted Carpet" },
    { id: "shaggyCarpet", label: "Shaggy Carpet" },
  ],
  color: [
    { id: "red", label: "Red" },
    { id: "blue", label: "Blue" },
    { id: "black", label: "Black" },
  ],
  size: [
    { id: "3x6", label: "3 x 6" },
    { id: "5x7", label: "5 x 7" },
    { id: "7x10", label: "7 x 10" },
  ],
  shape: [
    { id: "rectangle", label: "Rectangle" },
    { id: "square", label: "Square" },
  ],
  material: [
    { id: "wool", label: "Wool" },
    { id: "silk", label: "Silk" },
  ],
};

// ================= SORT OPTIONS =================

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

// ================= ADDRESS FORM =================

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];


export const ORDER_FLOW = {
  /* ================= PAYMENT PENDING ================= */
  pending: {
    label: "Pending",
    description: "Order placed, payment not completed",
    dot: "bg-yellow-400",
    color: "bg-yellow-500",
    next: null, // 🔒 cannot proceed
    requiresPayment: true,
  },

  payment_failed: {
    label: "Payment Failed",
    description: "Payment attempt failed",
    dot: "bg-red-500",
    color: "bg-red-600",
    next: null,
    final: true,
  },

  /* ================= PAYMENT SUCCESS ================= */
  confirmed: {
    label: "Confirmed",
    description: "Payment received, order confirmed",
    dot: "bg-blue-500",
    color: "bg-blue-600",
    next: "inProcess",
  },

  /* ================= FULFILLMENT ================= */
  inProcess: {
    label: "In Process",
    description: "Order is being prepared",
    dot: "bg-indigo-500",
    color: "bg-indigo-600",
    next: "inShipping",
  },

  inShipping: {
    label: "In Shipping",
    description: "Order handed over to courier",
    dot: "bg-purple-500",
    color: "bg-purple-600",
    next: "delivered",
  },

  delivered: {
    label: "Delivered",
    description: "Order delivered to customer",
    dot: "bg-green-600",
    color: "bg-green-700",
    final: true,
  },

  /* ================= ADMIN ACTIONS ================= */
  rejected: {
    label: "Rejected",
    description: "Order rejected by admin",
    dot: "bg-red-600",
    color: "bg-red-700",
    final: true,
    adminOnly: true,
  },

  cancelled: {
    label: "Cancelled",
    description: "Order cancelled",
    dot: "bg-gray-500",
    color: "bg-gray-600",
    final: true,
  },
};





export const PAYMENT_STATUS = {
  paid: {
    label: "Paid",
    color: "bg-green-500",
    tooltip: "Payment completed successfully",
  },
  pending: {
    label: "Pending",
    color: "bg-amber-500",
    tooltip: "Waiting for payment confirmation",
  },
  failed: {
    label: "Failed",
    color: "bg-red-500",
    tooltip: "Payment failed or cancelled",
  },
};

