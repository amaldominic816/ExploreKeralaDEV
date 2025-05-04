import Link from "next/link"

export function UserFooter() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Explore Kerala</h3>
            <p className="text-gray-400">
              Discover the beauty of God's Own Country with our comprehensive tourism platform.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/hotels" className="text-gray-400 hover:text-white">
                  Hotels
                </Link>
              </li>
              <li>
                <Link href="/packages" className="text-gray-400 hover:text-white">
                  Tour Packages
                </Link>
              </li>
              <li>
                <Link href="/houseboats" className="text-gray-400 hover:text-white">
                  Houseboats
                </Link>
              </li>
              <li>
                <Link href="/taxis" className="text-gray-400 hover:text-white">
                  Taxis
                </Link>
              </li>
              <li>
                <Link href="/activities" className="text-gray-400 hover:text-white">
                  Activities
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Destinations</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/destinations/munnar" className="text-gray-400 hover:text-white">
                  Munnar
                </Link>
              </li>
              <li>
                <Link href="/destinations/alleppey" className="text-gray-400 hover:text-white">
                  Alleppey
                </Link>
              </li>
              <li>
                <Link href="/destinations/wayanad" className="text-gray-400 hover:text-white">
                  Wayanad
                </Link>
              </li>
              <li>
                <Link href="/destinations/thekkady" className="text-gray-400 hover:text-white">
                  Thekkady
                </Link>
              </li>
              <li>
                <Link href="/destinations/kovalam" className="text-gray-400 hover:text-white">
                  Kovalam
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <address className="text-gray-400 not-italic">
              <p>123 Tourism Street</p>
              <p>Kochi, Kerala 682001</p>
              <p>India</p>
              <p className="mt-2">info@explorekeala.com</p>
              <p>+91 98765 43210</p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p>© 2024 Explore Kerala. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
