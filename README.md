# Travella - A Travel Accommodation Booking Application

Welcome to Travella, a modern travel booking platform designed to simplify the process of finding and booking accommodations. Built with the MERN stack (MongoDB, Express, React, and Node.js), Travella aims to enhance user experience with its seamless, efficient, and user-friendly interface.

## Table of Contents

- Introduction
- Key Features
- Technology Stack
- Usage
- API Documentation
- License
- Contact

---

## Introduction

Travella is a web application that connects travelers with hosts offering accommodations such as hotels, hostels, vacation rentals, and unique stays. It provides advanced search and filter functionalities, responsive design, and tools for both guests and hosts to ensure an exceptional experience.

---

## Key Features

### For Guests:
- **User Authentication**: Secure login and registration using JWT.
- **Accommodation Listings**: Browse various options with detailed information and high-quality images.
- **Advanced Search and Filters**: Search by location, price range, amenities, and ratings.
- **Responsive Design**: Optimized for all devices.
- **Gamification**: Earn rewards for bookings, reviews, and referrals.
- **AI Recommendations**: Personalized accommodation suggestions.

### For Hosts:
- **Property Management**: Add, edit, and manage property listings.
- **Earnings Insights**: Analyze trends like revenue and occupancy rates.
- **Booking Requests**: Accept or decline booking requests.
- **Host Badges**: Rewards for achieving milestones like becoming a "Superhost."

---

## Technology Stack

**Frontend:** React.js (with V0.dev for UI prototyping)

**Backend:** Node.js and Express.js

**Database:** MongoDB

**Authentication:** JWT (JSON Web Tokens)

---

## Usage

### Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDB

## API Documentation

### Authentication:
- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Login and retrieve a JWT token.

### Property Management:
- `GET /api/properties`: Retrieve all properties.
- `POST /api/properties`: Add a new property (Host-only).
- `PUT /api/properties/:id`: Update property details.
- `DELETE /api/properties/:id`: Remove a property.

### Booking Management:
- `POST /api/bookings`: Create a new booking.
- `GET /api/bookings/user`: View user bookings.
- `GET /api/bookings/host`: View host-related bookings.

---

## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License. See the LICENSE file for details.

---

## Contact

For any inquiries or contributions, please reach out to:

- Email - labibanajmee09@gmail.com

- GitHub: https://github.com/Labiba786

Thank you for using Travella!

