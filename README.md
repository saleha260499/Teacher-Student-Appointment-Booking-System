# Teacher-Student-Appointment-Booking-System
A full-stack appointment booking application built using the MERN stack (MongoDB, Express.js, React, Node.js).
Appointment MERN
A full-stack appointment booking application built using the MERN stack — MongoDB, Express.js,
React, and Node.js.
This project allows users to easily book, manage, and track their appointments with a clean and
responsive interface.
Features
- User registration & login with authentication
- Book, update, and cancel appointments
- View upcoming and past appointments
- Role-based access for users, teachers, and admin
- RESTful APIs with secure backend integration
- Responsive, mobile-friendly interface
Tech Stack
- Frontend: React, Redux (if used), Axios
- Backend: Node.js, Express.js
- Database: MongoDB (Mongoose ODM)

- Styling: CSS / Tailwind / Material-UI 
Installation
1. Clone the repository
git clone https://github.com/saleha260499/appointment_mern.git
cd appointment_mern
2. Install backend dependencies
cd server
npm install
3. Install frontend dependencies
cd ../client
npm install
4. Run the application
If you have configured concurrently:
npm run dev
Otherwise, run backend and frontend separately:
# In one terminal
cd server
npm start
# In another terminal
cd teacher
npm run dev
Environment Variables
Create a .env file in the server directory with the following variables:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
Folder Structure
appointment_mern/
■■■ client/ # React frontend
■■■ server/ # Node.js + Express backend
■■■ models/ # Mongoose models
■■■ routes/ # API routes
■■■ README.md
Contributing
Contributions are welcome!
1. Fork the repo
2. Create a new branch (feature/your-feature)
3. Commit your changes
4. Push the branch and create a Pull Request
License
This project is licensed under the MIT License.
Contact
For questions or feedback, reach out to [Salehabanu] (salehapathan909@gmail.com).
