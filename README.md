## WishTree

A simple React app to help you manage your wish list and shopping list for holidays and special dates.
Add, track and fullfill your wishes and your loved ones wishes.

Features:

- Add items to your wish list
- Make itemes as purchased, recived or booked
- Remove items when no longer needed or want
- Share your wish list with others
- Remainer for upcoming special dates
- Create shopping/gift list
- Sort items by price

Tech:

- React + TypeScript Vite + Stylex

---

Database:

```ts
const testData = {
  listName: "My 30th birthday",
  items: [
    {
      name: "shoe",
      addedDate: "11/01/2024",
      link: "www.shoelink.com",
      price: "33.44",
      color: "red",
      status: "open",
      description: "Item desc",
      quantity: 1,
      image: "donot know yet",
      mostWanted: true,
    },
    {
      name: "cube box",
      addedDate: "11/01/2024",
      link: "",
      price: "",
      color: "red",
      status: "open",
      description: "any cube box is fine",
      quantity: 4,
      image: "donot know yet",
      mostWanted: false,
    },
  ],
}
```

---

#### To dos

- mark items as received
- fb share feature
- change stylex to tailwind - low priority
- pop up forms to a page - low p
- work on users page
  - user card
