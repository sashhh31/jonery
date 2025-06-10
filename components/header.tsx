"use client"
import Link from "next/link"
import Image from "next/image"
import { Phone, MapPin, Clock } from "lucide-react"
import { useEffect, useState } from "react"
import { getHeaderContent, HeaderContent } from "../lib/contentful"

export default function Header() {
  const [headerData, setHeaderData] = useState<HeaderContent | null>(null);
  const [loading, setLoading] = useState(true);

  // Fallback data (current hardcoded data)
  const fallbackHeader: HeaderContent = {
    logo: null,
    businessHours: "Monday - Friday 9 AM - 5 PM",
    phone: "+1 (123) 456-7890",
    address: "2489 Gafforth Lane, LA",
    socialLinks: [
      { platform: "LinkedIn", url: "#" },
      { platform: "Twitter", url: "#" },
      { platform: "Facebook", url: "#" }
    ]
  };

  useEffect(() => {
    async function fetchHeaderData() {
      try {
        const data = await getHeaderContent();
        setHeaderData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching header data:', error);
        setHeaderData(fallbackHeader);
        setLoading(false);
      }
    }

    fetchHeaderData();
  }, []);

  const currentHeader = headerData || fallbackHeader;

  return (
    <header>
      {/* Top Bar - Now with Contentful Data */}
      <div className="bg-[#5a7d2a] text-white py-2">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-2 md:mb-0">
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-1" />
              <span>{currentHeader.businessHours}</span>
            </div>
            <div className="flex items-center text-sm">
              <Phone className="h-4 w-4 mr-1" />
              <span>{currentHeader.phone}</span>
            </div>
            <div className="flex items-center text-sm">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{currentHeader.address}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {currentHeader.socialLinks.map((social, index) => (
              <Link key={index} href={social.url} className="text-white hover:text-gray-200">
                <span className="text-sm">{social.platform}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navigation - Logo dynamic, Menu items hardcoded */}
      <div className="bg-[#855024] py-4 shadow-sm">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <Link href="/" className="mb-4 md:mb-0">
              <Image
                src={currentHeader.logo ? 
                  `https:${currentHeader.logo.fields.file.url}` : 
                  "/logo.png"
                }
                alt="Shay Joinery Ltd Logo"
                width={60}
                height={60}
                className="mr-3"
              />
          </Link>

          {/* Navigation Menu - Hardcoded as requested */}
          <nav>
            <ul className="flex flex-wrap text-white justify-center space-x-1 md:space-x-6">
              <NavItem href="/" label="Home" />
              <NavItem href="/about-us"  label="About Us" />
              <NavItem href="/our-services" label="Our Services" />
              <NavItem href="/portfolio" label="Portfolio" />
              <NavItem href="/contact-us" label="Contact Us" />
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

function NavItem({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link href={href} className="block px-3 py-2 text-white hover:text-[#5a7d2a] font-medium transition-colors">
        {label}
      </Link>
    </li>
  )
}
