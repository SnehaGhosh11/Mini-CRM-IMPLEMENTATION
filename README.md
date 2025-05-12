# Mini-CRM-IMPLEMENTATION

A full-stack, AI-powered Customer Relationship Management (CRM) platform designed to help businesses manage customer data, create dynamic segments, run marketing campaigns, and analyze customer engagement effectively. This application combines a professional React-based frontend interface with a Node.js + MongoDB backend, integrated with Google OAuth authentication and OpenAI's language models.

---

## 🔧 Features

- **Dashboard Overview**: Visual metrics of contacts, deals, revenue, and tasks.
- **Customer Segmentation**: Create complex customer segments using rules (AND/OR logic).
- **Campaign Management**: Build, send, and track campaigns.
- **Delivery & Logging**: Simulate campaign delivery and log status updates.
- **AI Integration**:
  - Natural Language → Segment rules
  - Campaign message suggestions
  - Campaign summaries
- **Google OAuth Authentication**: Secure login and access.
- **Responsive UI**: Clean, modern interface using Tailwind CSS and Lucide Icons.

---

## 📁 Project Structure

mini-crm-platform/
├── backend/ # Node.js + Express + MongoDB backend
├── frontend/ # React + Vite + Tailwind frontend
└── README.md

yaml
Copy
Edit

---

## 🛠️ Technologies Used

### Frontend:
- React.js
- Vite
- Tailwind CSS
- Lucide-react icons
- Axios

### Backend:
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT & Google OAuth (Passport.js or Firebase)
- OpenAI API
- Swagger for API documentation

---

## ⚙️ Setup Instructions

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/mini-crm-platform.git
cd mini-crm-platform

Step 2: Setup the Frontend
bash
Copy
Edit
cd frontend
npm install
npm run dev
Ensure your tailwind.config.js is correctly configured:

js
Copy
Edit
content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"]
Step 3: Setup the Backend
bash
Copy
Edit
cd backend
npm install
npm run dev
Create a .env file inside the backend/ folder:

ini
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret

🚀 Deployment Recommendations
Frontend:
Vercel

Netlify

Firebase Hosting

Backend:
Render

Railway

Fly.io

Heroku (with MongoDB Atlas)

🧪 Testing & Usage
Login using Google OAuth.

Upload customer and order data via dashboard or backend API.

Use the Segment Builder to define your audience.

Preview matching contacts and launch a campaign.

View delivery logs and campaign history.

Try AI tools for smart message suggestions and summaries.

🤝 Contributing
Contributions are welcome!

Fork the repo

Create a feature branch: git checkout -b feature-name

Commit changes: git commit -m "Add feature"

Push: git push origin feature-name

Open a Pull Request

📄 License
This project is licensed under the MIT License.

👏 Acknowledgements
OpenAI

MongoDB

Tailwind CSS

Lucide Icons

React

Vite

Google Cloud

