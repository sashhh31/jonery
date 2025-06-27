"use client"
import Link from "next/link"
import { Instagram, Facebook, Linkedin } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { getFooterContent, FooterContent } from "../lib/contentful"

export default function Footer() {
  const [footerData, setFooterData] = useState<FooterContent | null>(null);
  const [loading, setLoading] = useState(true);

  // Fallback data (current hardcoded data)
  const fallbackFooter: FooterContent = {
    logo: null,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec neque mauris leo quis ultricies venenatis. Vivamus ut metus sed gravida et porta in tellus.",
    socialLinks: [
      { platform: "Instagram", url: "#", icon: "instagram" },
      { platform: "Facebook", url: "#", icon: "facebook" },
      { platform: "LinkedIn", url: "#", icon: "linkedin" }
    ],
    serviceLinks: [
      { label: "Bespoke Furniture & Cabinetry", url: "#" },
      { label: "Kitchen Carpentry Services", url: "#" },
      { label: "Doors & Windows", url: "#" },
      { label: "Architectural Joinery", url: "#" },
      { label: "Commercial Joinery Services", url: "#" },
      { label: "Flooring Services", url: "#" },
      { label: "Additional Services", url: "#" }
    ],
    companyLinks: [
      { label: "About Us", url: "/about-us" },
      { label: "Our Services", url: "/our-services" },
      { label: "Contact Us", url: "/contact-us" }
    ],
    supportLinks: [
      { label: "Privacy Policy", url: "#" },
      { label: "Terms of Service", url: "#" },
      { label: "Code of Conduct", url: "#" }
    ],
    copyrightText: "© 2025 Shay Joinery Ltd. All rights reserved."
  };

  useEffect(() => {
    async function fetchFooterData() {
      try {
        const data = await getFooterContent();
        setFooterData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching footer data:', error);
        setFooterData(fallbackFooter);
        setLoading(false);
      }
    }

    fetchFooterData();
  }, []);

  const currentFooter = footerData || fallbackFooter;

  const getSocialIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'instagram':
        return <Instagram className="h-5 w-5" />;
      case 'facebook':
        return <Facebook className="h-5 w-5" />;
      case 'linkedin':
        return <Linkedin className="h-5 w-5" />;
      default:
        return <Instagram className="h-5 w-5" />;
    }
  };

  return (
    <footer className="bg-[#5a7d2a] text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="mb-4 md:mb-0">
              <Image
                src={currentFooter.logo ? 
                  `https:${currentFooter.logo.fields.file.url}` : 
                  "/logo.png"
                }
                alt="Shay Joinery Ltd Logo"
                width={60}
                height={60}
                className="mr-3 mb-6"
              />
            </Link>
            <p className="text-sm mb-4">
              {currentFooter.description}
            </p>
            <div className="flex space-x-4 mt-6">
              {currentFooter.socialLinks.map((social, index) => (
                <Link key={index} href={social.url} className="text-white hover:text-gray-200">
                  {getSocialIcon(social.icon)}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Services</h4>
            <ul className="space-y-2">
              {currentFooter.serviceLinks.map((service, index) => (
                <FooterLink key={index} href={service.url} label={service.label} />
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Company</h4>
            <ul className="space-y-2">
              {currentFooter.companyLinks.map((company, index) => (
                <FooterLink key={index} href={company.url} label={company.label} />
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Support</h4>
            <ul className="space-y-2">
              {currentFooter.supportLinks.map((support, index) => (
                <FooterLink key={index} href={support.url} label={support.label} />
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-[#6b8e3b] py-4">
        <div className="container">
          <p className="text-sm text-center">{currentFooter.copyrightText}</p>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link href={href || '#'} className="text-sm hover:underline">
        {label}
      </Link>
    </li>
  )
}
