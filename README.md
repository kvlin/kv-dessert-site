# Kv-Dessert-Studio

[![Website shields.io](https://img.shields.io/website-up-down-green-red/http/shields.io.svg)](http://shields.io/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)


## Description 

This is a responsive e-commerce application that allows restaurants/dessert stores to sell their products online.


There are two types of application users: *admins* and *visitors*. Admins are able to add/edit/delete products and categories. Visitors are able to log in and add items to their cart to make purchases.  

## Table of Contents 

- [Motivations](#Motivations)
- [Technologies Used](#Technologies-Used)
- [Links](#Links)
- [Screenshots](#Screenshots)
- [Further Development options](#Further-Development-options)
- [License](#License)


## Motivations 
This is an e-commerce application that provides restaurant and dessert owners with an online presence and allows visitors to make purchases online.


Since this is an individually developed project, I wanted this application to facilitate at least the basic processes of online shopping, which are to provide the retail owners (admins) with an online platform to sell their products and for the visitors to make purchases (please note that the payment system is not implemented as this is not a real store).

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
Note: For simplicity, the admin page uses the same domain URL as the visitor, but with a different path, and it's not displayed on the navigation bar.
![Admin page](client/public/images/readme/readme-admin.png)

### Further Development options
- Implement payment system
- Implement user registration option
- Implement user profile page
- Implement user order history page
- Implement user review system (currently hard coded in the database)
- Implement user search function

## License 

This application is covered under the ISC license.
For more information, [click here](https://opensource.org/licenses/ISC).
