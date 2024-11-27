import { Github, Twitter } from "lucide-react"
import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer className="w-full border-t border-zinc-800 bg-zinc-950 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <Link to="/" className="flex items-center space-x-2">
              <span role="img" aria-label="logo" className="text-2xl">
                🏠
              </span>
              <span className="font-bold text-white">Memerhouse</span>
            </Link>
            <p className="text-center text-sm text-zinc-400 sm:text-left">
              © 2024 Memerhouse. All rights reserved.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-6">
            <nav className="flex gap-4">
              <Link
                to="/terms"
                className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
              >
                Terms
              </Link>
              <Link
                to="/privacy"
                className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
              >
                Privacy
              </Link>
            </nav>
            <div className="flex items-center space-x-2">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer