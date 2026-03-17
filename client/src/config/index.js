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
       { id: "iraniPersian", label: "Irani Persian" },
      { id: "iraniBambooSilk", label: "Irani Bamboo Silk" },
      { id: "turkeyPersianGeometrical", label: "Turkey Persian & Geometrical" },
      { id: "indianPersianGeometrical", label: "Indian Persian & Geometrical" },
      { id: "handTufted", label: "Hand Tufted" },
      { id: "importedRabbitFur", label: "Imported Rabbit Fur" },
      { id: "shaggyCarpet", label: "Shaggy Carpet" },
      { id: "doormat", label: "Doormat" },
    ],
  },
  {
    label: "Color",
    name: "color",
    componentType: "select",
    options: [
       { id: "red", label: "Red" },
      { id: "cream", label: "Cream" },
      { id: "blue", label: "Blue" },
      { id: "beige", label: "Beige" },
      { id: "grey", label: "Grey" },
      { id: "black", label: "Black" },
      { id: "yellow", label: "Yellow" },
      { id: "candyBrown", label: "Candy Brown" },
      { id: "brown", label: "Brown" },
    ],
  },
  {
    label: "Shape",
    name: "shape",
    componentType: "select",
    options: [
      { id: "round", label: "Round" },
      { id: "square", label: "Square" },
      { id: "rectangle", label: "Rectangle" },
      { id: "oval", label: "Oval" },
    ],
  },
  {
    label: "Material",
    name: "material",
    componentType: "select",
    options: [
     { id: "silk", label: "Silk" },
      { id: "acrylic", label: "Acrylic" },
      { id: "woolen", label: "Woolen" },
      { id: "polypropylene", label: "Polypropylene" },
    ],
  },
  {
    label: "Show on Home Page",
    name: "isFeatured",
    componentType: "switch",
    defaultValue: false,
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
    { id: "iraniPersian", label: "Irani Persian" },
    { id: "iraniBambooSilk", label: "Irani Bamboo Silk" },
    { id: "turkeyPersianGeometrical", label: "Turkey Persian & Geometrical" },
    { id: "indianPersianGeometrical", label: "Indian Persian & Geometrical" },
    { id: "handTufted", label: "Hand Tufted" },
    { id: "importedRabbitFur", label: "Imported Rabbit Fur" },
    { id: "shaggyCarpet", label: "Shaggy Carpet" },
    { id: "doormat", label: "Doormat" },
  ],

  color: [
    { id: "red", label: "Red" },
    { id: "cream", label: "Cream" },
    { id: "blue", label: "Blue" },
    { id: "beige", label: "Beige" },
    { id: "grey", label: "Grey" },
    { id: "black", label: "Black" },
    { id: "yellow", label: "Yellow" },
    { id: "candyBrown", label: "Candy Brown" },
    { id: "brown", label: "Brown" },
  ],

  size: [
    { id: "2x4", label: "2 x 4" },
    { id: "2x5", label: "2 x 5" },
    { id: "2x6", label: "2 x 6" },
    { id: "3x5", label: "3 x 5" },
    { id: "4x4", label: "4 x 4" },
    { id: "4x6", label: "4 x 6" },
    { id: "5x5", label: "5 x 5" },
    { id: "5x7", label: "5 x 7" },
    { id: "6x6", label: "6 x 6" },
    { id: "6x8", label: "6 x 8" },
    { id: "6x9", label: "6 x 9" },
    { id: "8x11", label: "8 x 11" },
    { id: "9x12", label: "9 x 12" },
    { id: "10x13", label: "10 x 13" },
    { id: "12x15", label: "12 x 15" },
  ],

  shape: [
    { id: "round", label: "Round" },
    { id: "square", label: "Square" },
    { id: "rectangle", label: "Rectangle" },
    { id: "oval", label: "Oval" },
  ],

  material: [
    { id: "silk", label: "Silk" },
    { id: "acrylic", label: "Acrylic" },
    { id: "woolen", label: "Woolen" },
    { id: "polypropylene", label: "Polypropylene" },
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

