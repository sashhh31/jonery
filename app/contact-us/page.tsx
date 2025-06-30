"use client"
import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Menu, X, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { getContactHero, getContactFormSection, getOfficeAddressesSection, ContactHero, ContactFormSection, OfficeAddressesSection } from '../../lib/contentful';
import { useToast } from "@/components/ui/use-toast";

const ShayJoineryContact = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [contactHeroData, setContactHeroData] = useState<ContactHero | null>(null);
  const [contactFormData, setContactFormData] = useState<ContactFormSection | null>(null);
  const [officeAddressesData, setOfficeAddressesData] = useState<OfficeAddressesSection | null>(null);
  const [activeLocation, setActiveLocation] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Furniture',
    propertyLocation: '',
    projectDescription: '',
    preferredContact: '',
    Timeline: ''
  });
  const contactMethods = ['Email', 'Phone'];

  const fallbackHero = {
    title: "Get in Touch with London's Expert Carpenters",
    subtitle: "Ready to discuss your carpentry or joinery project? Contact Shay Joinery today for a free consultation and quote. Our London-based team is here to bring your vision to life.",
    backgroundImage: null
  };

  const fallbackForm = {
    title: "Get In Touch",
    subtitle: "Say hay to us!",
    buttonText: "Send Messages",
    projectTypeOptions: [
      "Furniture",
      "Kitchen Carpentry",
      "Doors & Windows",
      "Architectural Joinery",
      'Flooring Services',
      "Commercial"
    ]
  };

  const fallbackOfficeAddresses = {
    subtitle: "Addresses",
    title: "Our Office Addresses",
    locations: [
      {
        locationName: "Central London",
        isActive: true,
        phoneNumbers: ["07949 296795", "07973 282475"],
        emailAddress: "shay.joineryltd@gmail.com",
        officeAddress: "Railway Arch 467, Bow Common Lane, London E3 4BN / E3 4BH"
      },
      {
        locationName: "North London",
        isActive: false,
        phoneNumbers: ["07949 296795"],
        emailAddress: "shay.joineryltd@gmail.com",
        officeAddress: "North London Office Address"
      },
      {
        locationName: "South London",
        isActive: false,
        phoneNumbers: ["07973 282475"],
        emailAddress: "shay.joineryltd@gmail.com",
        officeAddress: "South London Office Address"
      },
      {
        locationName: "East London",
        isActive: false,
        phoneNumbers: ["07949 296795"],
        emailAddress: "shay.joineryltd@gmail.com",
        officeAddress: "East London Office Address"
      }
    ]
  };

  useEffect(() => {
    async function fetchContactData() {
      try {
        const [heroData, formSectionData, officeData] = await Promise.all([
          getContactHero(),
          getContactFormSection(),
          getOfficeAddressesSection()
        ]);
        
        setContactHeroData(heroData);
        setContactFormData(formSectionData);
        setOfficeAddressesData(officeData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching contact data:', error);
        setContactHeroData(fallbackHero);
        setContactFormData(fallbackForm);
        setOfficeAddressesData(fallbackOfficeAddresses);
        setLoading(false);
      }
    }

    fetchContactData();
  }, []);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRadioChange = (value: string) => {
    setFormData(prev => ({ ...prev, preferredContact: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!response.ok) throw new Error('Failed to send');
      toast({ title: 'Done', description: 'Your enquiry has been sent successfully.' });
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: 'Furniture',
        propertyLocation: '',
        projectDescription: '',
        preferredContact: '',
        Timeline: ''
      });
    } catch (err) {
      toast({ title: 'Failed to send enquiry', description: 'Please try again later.', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  const currentHero = contactHeroData || fallbackHero;
  const currentForm = contactFormData || fallbackForm;
  const currentOfficeAddresses = officeAddressesData || fallbackOfficeAddresses;
  const currentLocation = currentOfficeAddresses.locations[activeLocation] || currentOfficeAddresses.locations[0];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#925422] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      {/* Hero Section - Dynamic from Contentful */}
      <section className="relative bg-[#855024] py-24 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={currentHero.backgroundImage ? 
              `https:${currentHero.backgroundImage.fields.file.url}` : 
              `/${Math.floor(Math.random() * 8) + 1}.png`
            }
            alt="Background"
            layout="fill"
            objectFit="cover"
            className="opacity-20"
          />
          <div className="absolute inset-0 bg-[#855024] opacity-60"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            {(() => {
              const words = currentHero.title.split(' ');
              const mid = Math.ceil(words.length / 2);
              return <>{words.slice(0, mid).join(' ')}<br />{words.slice(mid).join(' ')}</>;
            })()}
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            {currentHero.subtitle}
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{currentForm.title}</h2>
            <h3 className="text-4xl font-bold text-navy-900">{currentForm.subtitle}</h3>
          </div>

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Your Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone Number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Project Type</label>
                <div className="relative">
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    title="Select project type"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 appearance-none"
                  >
                    {currentForm.projectTypeOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Property Location</label>
                <input
                  type="text"
                  name="propertyLocation"
                  value={formData.propertyLocation}
                  onChange={handleInputChange}
                  placeholder="Enter your Property Location"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Project Description</label>
                <textarea
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleInputChange}
                  placeholder="Enter your message"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 resize-vertical"
                  rows={5}
                ></textarea>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Preferred Contact Method</label>
                <div className="flex gap-4">
                  {contactMethods.map(method => (
                    <label key={method} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="preferredContact"
                        value={method}
                        checked={formData.preferredContact === method}
                        onChange={() => handleRadioChange(method)}
                      />
                      {method}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Timeline</label>
                <input
                  type="text"
                  name="Timeline"
                  value={formData.Timeline}
                  onChange={handleInputChange}
                  placeholder="Tell us how soon you want your project started!"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors duration-200"
                disabled={submitting}
              >
                {submitting ? 'Sending...' : currentForm.buttonText}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Office Addresses Section - Dynamic from Contentful */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-12">
            <p className="text-gray-600 mb-2">{currentOfficeAddresses.subtitle}</p>
            <h2 className="text-4xl font-bold text-gray-900">{currentOfficeAddresses.title}</h2>
          </div>

          <div className="flex flex-wrap justify-center mb-8 space-x-4">
            {currentOfficeAddresses.locations.map((location, index) => (
              <button
                key={location.locationName}
                onClick={() => setActiveLocation(index)}
                className={`px-6 py-2 rounded-full transition-colors ${
                  activeLocation === index
                    ? 'bg-amber-700 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {location.locationName}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-amber-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-medium text-gray-600 mb-2">Phone number</h3>
              <p className="text-gray-900 font-medium">
                {currentLocation.phoneNumbers.map((phone, index) => (
                  <span key={index}>
                    {phone}
                    {index < currentLocation.phoneNumbers.length - 1 && <br />}
                    {index < currentLocation.phoneNumbers.length - 1 && index === 0 && ' / '}
                  </span>
                ))}
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-amber-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-medium text-gray-600 mb-2">Email Address</h3>
              <p className="text-gray-900 font-medium">{currentLocation.emailAddress}</p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="w-16 h-16 bg-amber-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-medium text-gray-600 mb-2">Office Address</h3>
              <p className="text-gray-900 font-medium">
                {currentLocation.officeAddress.split(',').map((line, index) => (
                  <span key={index}>
                    {line.trim()}
                    {index < currentLocation.officeAddress.split(',').length - 1 && <br />}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShayJoineryContact;