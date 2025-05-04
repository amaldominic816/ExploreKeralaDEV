import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export function MainFooter() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Explore Kerala</h3>
            <p className="text-gray-400 mb-4">
              Discover the beauty of God's Own Country with our comprehensive tourism platform.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/hotels" className="text-gray-400 hover:text-white transition-colors">
                  Hotels
                </Link>
              </li>
              <li>
                <Link href="/packages" className="text-gray-400 hover:text-white transition-colors">
                  Tour Packages
                </Link>
              </li>
              <li>
                <Link href="/houseboats" className="text-gray-400 hover:text-white transition-colors">
                  Houseboats
                </Link>
              </li>
              <li>
                <Link href="/taxis" className="text-gray-400 hover:text-white transition-colors">
                  Taxis
                </Link>
              </li>
              <li>
                <Link href="/activities" className="text-gray-400 hover:text-white transition-colors">
                  Activities
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Destinations</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/destinations/munnar" className="text-gray-400 hover:text-white transition-colors">
                  Munnar
                </Link>
              </li>
              <li>
                <Link href="/destinations/alleppey" className="text-gray-400 hover:text-white transition-colors">
                  Alleppey
                </Link>
              </li>
              <li>
                <Link href="/destinations/wayanad" className="text-gray-400 hover:text-white transition-colors">
                  Wayanad
                </Link>
              </li>
              <li>
                <Link href="/destinations/thekkady" className="text-gray-400 hover:text-white transition-colors">
                  Thekkady
                </Link>
              </li>
              <li>
                <Link href="/destinations/kovalam" className="text-gray-400 hover:text-white transition-colors">
                  Kovalam
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="text-gray-400 not-italic space-y-2">
              <p>123 Tourism Street</p>
              <p>Kochi, Kerala 682001</p>
              <p>India</p>
              <p className="mt-4">info@explorekeala.com</p>
              <p>+91 98765 43210</p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© 2024 Explore Kerala. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
