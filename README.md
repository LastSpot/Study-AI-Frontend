# Study AI - Interactive Learning Assistant

Study AI is a modern web application that helps students study their lecture materials through interactive chat conversations. Upload your lecture PDFs and engage in meaningful discussions about the content with an AI assistant.

## Features

### Chat Interface
- 💬 Interactive chat with AI about your lecture content
- 📝 Context-aware responses based on uploaded materials
- ⚡ Real-time message updates
- 🔄 Auto-scrolling with manual scroll-to-bottom option

### Document Management
- 📤 PDF upload support
- 📚 Save and manage multiple lectures
- ✏️ Edit lecture titles
- 🗑️ Delete unwanted lectures
- 📋 View lecture history

### User Interface
- 📱 Responsive design for mobile and desktop
- 🌓 Light/Dark theme support
- 🎯 Intuitive sidebar navigation
- 💫 Smooth animations and transitions
- 🎨 Modern and clean design

### Technical Features
- 🔒 Secure authentication
- 💾 Persistent storage of lectures and chat history
- 🚀 Optimized performance
- 🛠️ Error handling and recovery

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Backend service running (see backend repository)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/study-ai-frontend.git
cd study-ai-frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your environment variables:
```env
VITE_API_URL=your_backend_url
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

### Building for Production

To create a production build:
```bash
npm run build
# or
yarn build
```

## Usage

1. **Login/Register**: Start by creating an account or logging in
2. **Upload Lecture**: Click the upload button and select a PDF file
3. **Start Chatting**: Once uploaded, you can start asking questions about the lecture
4. **Manage Lectures**: Use the sidebar to:
   - Switch between different lectures
   - Edit lecture titles
   - Delete lectures
   - Start new chat sessions

## Technologies Used

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Build Tool**: Vite
- **State Management**: React Hooks
- **Routing**: React Router
- **HTTP Client**: Axios

## Project Structure

```
src/
├── components/        # Reusable UI components
├── contexts/         # React contexts (auth, theme)
├── lib/             # Utility functions
├── pages/           # Main page components
└── styles/          # Global styles and Tailwind config
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Lucide](https://lucide.dev/) for the icons
- [Tailwind CSS](https://tailwindcss.com/) for the styling system
