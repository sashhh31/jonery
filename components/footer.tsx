"use client"
import Link from "next/link"
import { Instagram, Facebook, Linkedin } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { getFooterContent, FooterContent } from "../lib/contentful"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import type { FooterLink } from "../lib/contentful"
import ReactMarkdown from 'react-markdown'

// Extend FooterLink for support links to allow 'data' field
interface SupportFooterLink extends Omit<FooterLink, 'url'> {
  data: string;
}

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
      { label: "Bespoke Furniture & Cabinetry", url: "/our-services" },
      { label: "Kitchen Carpentry Services", url: "/our-services" },
      { label: "Doors & Windows", url: "/our-services" },
      { label: "Architectural Joinery", url: "/our-services" },
      { label: "Commercial Joinery Services", url: "/our-services" },
      { label: "Flooring Services", url: "/our-services" },
      { label: "Additional Services", url: "/our-services" }
    ],
    companyLinks: [
      { label: "About Us", url: "/about-us" },
      { label: "Our Services", url: "/our-services" },
      { label: "Contact Us", url: "/contact-us" }
    ],
    supportLinks: [
      { label: "Privacy Policy", url: "Privacy policy content goes here." },
      { label: "Terms of Service", url: "Terms of service content goes here." },
      { label: "Code of Conduct", url: "Code of conduct content goes here." }
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

  const currentFooter = {
    ...((footerData || fallbackFooter)),
    serviceLinks: (footerData?.serviceLinks || fallbackFooter.serviceLinks).map(service => ({
      ...service,
      url: "/our-services"
    }))
  };

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
        {/* Mobile Layout: Logo/Description on top, Services left, Company/Support right */}
        <div className="block md:hidden">
          {/* Logo and Description - Full width on mobile */}
          <div className="flex flex-col items-center text-center mb-8">
            <Link href="/" className="mb-4">
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
            <p className="text-sm mb-4 max-w-xs mx-auto">
              {currentFooter.description}
            </p>
            <div className="flex space-x-4 mt-6 justify-center">
              {currentFooter.socialLinks.map((social, index) => (
                <Link key={index} href={social.url} className="text-white hover:text-gray-200">
                  {getSocialIcon(social.icon)}
                </Link>
              ))}
            </div>
          </div>

          {/* Services left, Company/Support right on mobile */}
          <div className="grid grid-cols-2 gap-6">
            {/* Services - Left side */}
            <div className="flex flex-col items-center text-center">
              <h4 className="font-bold text-lg mb-4">Services</h4>
              <ul className="space-y-2">
                {currentFooter.serviceLinks.map((service, index) => (
                  <FooterLink key={index} href={service.url} label={service.label} />
                ))}
              </ul>
            </div>

            {/* Company and Support - Right side */}
            <div className="flex flex-col items-center text-center space-y-6">
              {/* Company */}
              <div className="flex flex-col items-center text-center">
                <h4 className="font-bold text-lg mb-4">Company</h4>
                <ul className="space-y-2">
                  {currentFooter.companyLinks.map((company, index) => (
                    <FooterLink key={index} href={company.url} label={company.label} />
                  ))}
                </ul>
              </div>

              {/* Support */}
              <div className="flex flex-col items-center text-center">
                <h4 className="font-bold text-lg mb-4">Support</h4>
                <ul className="space-y-2">
                  {(currentFooter.supportLinks as unknown as SupportFooterLink[]).map((support, index) => (
                    <li key={index}>
                      <Dialog>
                        <DialogTrigger asChild>
                          <button className="text-sm hover:underline text-center w-full">
                            {support.label}
                          </button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl w-full rounded-2xl p-10 shadow-2xl bg-white text-gray-900 max-h-[70vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="text-2xl font-bold mb-2 text-green-800">{support.label}</DialogTitle>
                          </DialogHeader>
                          <hr className="my-4 border-green-200" />
                          <div className="prose prose-green max-w-none text-base leading-relaxed">
                            <ReactMarkdown>{support.data}</ReactMarkdown>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout: 4-column grid */}
        <div className="hidden md:grid md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center">
            <Link href="/" className="mb-4">
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
            <p className="text-sm mb-4 max-w-xs mx-auto">
              {currentFooter.description}
            </p>
            <div className="flex space-x-4 mt-6 justify-center">
              {currentFooter.socialLinks.map((social, index) => (
                <Link key={index} href={social.url} className="text-white hover:text-gray-200">
                  {getSocialIcon(social.icon)}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center text-center">
            <h4 className="font-bold text-lg mb-4">Services</h4>
            <ul className="space-y-2">
              {currentFooter.serviceLinks.map((service, index) => (
                <FooterLink key={index} href={service.url} label={service.label} />
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center text-center">
            <h4 className="font-bold text-lg mb-4">Company</h4>
            <ul className="space-y-2">
              {currentFooter.companyLinks.map((company, index) => (
                <FooterLink key={index} href={company.url} label={company.label} />
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center text-center">
            <h4 className="font-bold text-lg mb-4">Support</h4>
            <ul className="space-y-2">
              {(currentFooter.supportLinks as unknown as SupportFooterLink[]).map((support, index) => (
                <li key={index}>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="text-sm hover:underline text-center w-full">
                        {support.label}
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl w-full rounded-2xl p-10 shadow-2xl bg-white text-gray-900 max-h-[70vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold mb-2 text-green-800">{support.label}</DialogTitle>
                      </DialogHeader>
                      <hr className="my-4 border-green-200" />
                      <div className="prose prose-green max-w-none text-base leading-relaxed">
                        <ReactMarkdown>{support.data}</ReactMarkdown>
                      </div>
                    </DialogContent>
                  </Dialog>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-[#6b8e3b] py-4">
        <div className="container flex flex-col items-center justify-center">
          <p className="text-sm text-center">{currentFooter.copyrightText}</p>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link href={href || '#'} className="text-sm hover:underline text-center">
        {label}
      </Link>
    </li>
  )
}
