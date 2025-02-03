import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-gray-900">Aditya Pimpale</h3>
            <p className="text-gray-600">Computer Science Engineer</p>
          </div>
          
          <div className="flex items-center space-x-6">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="mailto:your.email@example.com"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 text-center text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} Dev Shop. All rights reserved.</p>
          <p className="mt-1">Built with React, Tailwind CSS, and ❤️</p>
        </div>
      </div>
    </footer>
  );
}