# Dev Shop 🛍️
**Online store to buy things related to web development.**

![Demo](https://res.cloudinary.com/dnxchppfm/image/upload/v1660876413/franklin-page/devshop_v1akni.png)

&nbsp;

## Features ⚙️
### **Client**
1. Login.
2. Create an account.
3. Log out.
4. GitHub authentication.
5. Private and public paths.
6. View products.
7. Filter products by genre.
8. Sidebar .
9. Add products to the shopping cart.
10. Remove products from shopping cart.
11. Confirm order.
12. Pay the order with PayPal payment method.
13. View order history.
### **Admin**
1. Administrative Dashboard.
2. Edit user roles.
3. Create products.
4. Edit products.
5. View history of all orders for all users.

&nbsp;

## Main Technologies 🧪

- **Next JS**.
- **TypeScript** .
- **Zustand** (State management).
- **DaisyUI** (Component library).
- **Cloudinary** (Manage images).
- **Next Auth** (Manage Authentication).
- **PayPal** (Method of payment).
- **Vercel** (To deploy the app).
- **Mongoose** (ORM for mongo db).

&nbsp;


## **Installation 🧰**

1. Clone the repository (you need to have [Git](https://git-scm.com) installed).

```shell
    git clone https://github.com/Franklin361/dev-shop
```

2.  Install dependencies of the project.

```shell
    npm install
```

3. Before running the development server, you need to...

Create an `.env` file in the root of the project and set the following value:
    ```
    MONGO_URL=
    
    NEXT_PUBLIC_RATE=
    NEXTAUTH_SECRET=

    GITHUB_ID=
    GITHUB_SECRET=

    NEXT_PUBLIC_PAYPAL_CLIENT_ID=
    PAYPAL_SECRET=

    PAYPAL_OAUTH_URL=
    PAYPAL_ORDERS_URL=

    CLOUDINARY_URL=
    ```

4. Run the project.
```shell
    npm run dev
```
&nbsp;

## **Demo ⛓️**

[https://dev-shop-fml.herokuapp.com](https://dev-shop-fml.herokuapp.com/)

