"use client"
import Link from "next/link"
import Image from "next/image"
import { Phone, MapPin, Clock, Facebook, Linkedin, Twitter, Youtube, Instagram, Menu, X } from "lucide-react"
import { useEffect, useState } from "react"
import { getHeaderContent, HeaderContent } from "../lib/contentful"

export default function Header() {
  const [headerData, setHeaderData] = useState<HeaderContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Fallback data (current hardcoded data)
  const fallbackHeader: HeaderContent = {
    logo: {
      fields: {
        file: {
          url: "/logo.png"
        }
      }
    },
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

  const getSocialIcon = (icon: string) => {
    switch (icon?.toLowerCase()) {
      case 'facebook':
        return <Facebook className="h-5 w-5" />;
      case 'linkedin':
        return <Linkedin className="h-5 w-5" />;
      case 'twitter':
        return <Twitter className="h-5 w-5" />;
      case 'youtube':
      case 'yt':
        return <Youtube className="h-5 w-5" />;
      case 'instagram':
      case 'insta':
        return <Instagram className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <header>
      {/* Top Bar - Redesigned for aesthetics and mobile */}
      <div className="bg-gradient-to-r from-[#6fa44a] to-[#5a7d2a] text-white py-2 px-2 sm:px-0">
        <div className="container mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          {/* Info section */}
          <div className="flex flex-col sm:flex-row sm:items-center w-full sm:w-auto text-xs sm:text-sm text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-1 sm:gap-2 mb-1 sm:mb-0">
              <Clock className="h-4 w-4 mr-1 text-[#e4cc7f]" />
              <span>{currentHeader.businessHours}</span>
            </div>
            <span className="hidden sm:inline-block mx-2 text-[#e4cc7f]">|</span>
            <div className="flex items-center justify-center sm:justify-start gap-1 sm:gap-2 mb-1 sm:mb-0">
              <Phone className="h-4 w-4 mr-1 text-[#e4cc7f]" />
              <span>{currentHeader.phone}</span>
            </div>
            <span className="hidden sm:inline-block mx-2 text-[#e4cc7f]">|</span>
            <div className="flex items-center justify-center sm:justify-start gap-1 sm:gap-2">
              <MapPin className="h-4 w-4 mr-1 text-[#e4cc7f]" />
              <span>{currentHeader.address}</span>
            </div>
          </div>
          {/* Social links section */}
          <div className="flex justify-center sm:justify-end items-center gap-3 mt-1 sm:mt-0">
            {currentHeader.socialLinks.map((social, index) => (
              <Link key={index} href={social.url} className="text-white hover:text-[#e4cc7f] transition-colors">
                {getSocialIcon((social as any).icon || social.platform)}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navigation - Responsive */}
      <div className="bg-[#855024] py-4 shadow-sm">
        <div className="container flex items-center justify-between px-4">
          <Link href="/" className="flex items-center">
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

          {/* Desktop Nav */}
          <nav className="hidden md:block">
            <ul className="flex flex-wrap text-white justify-center space-x-1 md:space-x-6">
              <NavItem href="/" label="Home" />
              <NavItem href="/about-us"  label="About Us" />
              <NavItem href="/our-services" label="Our Services" />
              <NavItem href="/portfolio" label="Portfolio" />
              <NavItem href="/contact-us" label="Contact Us" />
            </ul>
          </nav>

          {/* Hamburger for mobile */}
          <button
            className="md:hidden flex items-center justify-center p-2 rounded focus:outline-none focus:ring-2 focus:ring-white"
            onClick={() => setMobileNavOpen(v => !v)}
            aria-label="Open navigation menu"
          >
            {mobileNavOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
        {/* Mobile Nav Drawer */}
        {mobileNavOpen && (
          <nav className="md:hidden bg-[#855024] px-4 pb-4 animate-fadeIn">
            <ul className="flex flex-col space-y-2 mt-2">
              <NavItem href="/" label="Home" />
              <NavItem href="/about-us"  label="About Us" />
              <NavItem href="/our-services" label="Our Services" />
              <NavItem href="/portfolio" label="Portfolio" />
              <NavItem href="/contact-us" label="Contact Us" />
            </ul>
          </nav>
        )}
        <style jsx>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: none; }
          }
          .animate-fadeIn { animation: fadeIn 0.2s; }
        `}</style>
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
