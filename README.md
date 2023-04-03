# Kv-Dessert-Studio

[![Website shields.io](https://img.shields.io/website-up-down-green-red/http/shields.io.svg)](http://shields.io/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)


## Description 

This is an responsive ecommerce application that allow restaurant/dessert stores to sell their products online. 

There are two types of application users: *admin* and *visitors*. Admins are able to add/edit/delete products and categories. visitors are able to log in and add items to their cart to make purchases.  

## Table of Contents 

- [Motivations](#Motivations)
- [Technologies Used](#Technologies-Used)
- [Links](#Links)
- [Screenshots](#Screenshots)
- [License](#License)

## Motivations 
This is an ecommerce application that provides restaurant/dessert owners online presence and allow visitors to make purchases online.

As and individual project, I wanted to design a useful application that would facilitate the basic process of online shopping, which are to provide the retail owners (admins) an online platform to sell their products and for the users to make purchases (kindly note that the payment system is not implemented as this is not a real store).

## Technologies Used

- AWS EC2
- AWS S3
- AWS DynamoDB
- NGINX
- React.js
- Node.js 
- Express / Express sessions 
- Passport.js
- bcrypt
- CSS / Bootstrap
- Google Fonts

## Links 

Deployed on AWS EC2: [Homepage](http://3.15.220.133/home)

## Screenshots 

### Homepage
![Homepage](client/public/images/readme/readme-home.png)

### Product page 
![Product page](client/public/images/readme/readme-product.png)

### Cart page
![Cart page](client/public/images/readme/readme-cart.png)

### Admin page
![Admin page](public/images/readme/readme-admin.png)
Note: for simplicity, the admin page uses the same domain URL as the visitor, but with a different path and it's not displayed on the navigation bar.

## License 

This application is covered under the ISC license.
For more information, [click here](https://opensource.org/licenses/ISC).
