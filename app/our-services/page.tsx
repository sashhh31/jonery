"use client"
import React from 'react';
import { useEffect, useState } from 'react';
import { Target, Zap, Shield, Award, CheckCircle, Users, Hammer, Home, DoorOpen, Building, ChevronLeft, ChevronRight, PlaneTakeoff, Lightbulb, MapPin } from 'lucide-react';
import ServicesSection from '../test/page';
import Image from "next/image";
import { 
  getServices, 
  getServicesHeader, 
  getProcessSection,
  getFeaturesSection,
  getServicesHero,
  Service, 
  ServicesHeader, 
  ProcessSection,
  FeaturesSection,
  ServicesHero 
} from '../../lib/contentful';

const CarpentryServicesPage = () => {
  const [servicesData, setServicesData] = useState<Service[]>([]);
  const [servicesHeaderData, setServicesHeaderData] = useState<ServicesHeader | null>(null);
  const [processData, setProcessData] = useState<ProcessSection | null>(null);
  const [featuresData, setFeaturesData] = useState<FeaturesSection | null>(null);
  const [servicesHeroData, setServicesHeroData] = useState<ServicesHero | null>(null);
  const [loading, setLoading] = useState(true);

  const fallbackHero = {
    title: "Professional Carpentry & Joinery Services in London",
    subtitle: "Stay Joinery offers comprehensive carpentry and joinery services throughout Greater London. Our skilled craftsmen deliver exceptional results, from bespoke furniture to commercial fit-outs.",
    backgroundImage: null
  };

  const fallbackFeatures = {
    subtitle: "Features",
    title: "Develop ideas into solutions for your business",
    description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.",
    features: [
      {
        title: "On Target",
        description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        icon: "Target",
        backgroundColor: "bg-white",
        textColor: "text-gray-800",
        iconBackgroundColor: "bg-amber-600"
      },
      {
        title: "Efficient",
        description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type.",
        icon: "Zap",
        backgroundColor: "bg-white",
        textColor: "text-gray-800",
        iconBackgroundColor: "bg-amber-600"
      },
      {
        title: "Full Support",
        description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type.",
        icon: "Shield",
        backgroundColor: "bg-white",
        textColor: "text-gray-800",
        iconBackgroundColor: "bg-amber-600"
      },
      {
        title: "Guarantee",
        description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type.",
        icon: "CheckCircle",
        backgroundColor: "bg-white",
        textColor: "text-gray-800",
        iconBackgroundColor: "bg-amber-600"
      },
      {
        title: "Safe and Secure",
        description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type.",
        icon: "Award",
        backgroundColor: "bg-white",
        textColor: "text-gray-800",
        iconBackgroundColor: "bg-amber-600"
      },
      {
        title: "Trusted",
        description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type.",
        icon: "Users",
        backgroundColor: "bg-white",
        textColor: "text-gray-800",
        iconBackgroundColor: "bg-amber-600"
      }
    ]
  };

  // Fallback data
  const fallbackServices = [
    {
      title: "Bespoke Furniture & Cabinetry",
      description: "Transform your space with our handcrafted furniture, including wardrobes, storage units, desks, and custom-built kitchen cabinets—designed to fit your space perfectly.",
      icon: "🪑",
      backgroundColor: "bg-amber-800",
      textColor: "text-white"
    },
    {
      title: "Kitchen Carpentry Services", 
      description: "Create your dream kitchen with custom carpentry—handmade kitchen units, breakfast bars, islands, pantries, and tailored storage solutions built just for you.",
      icon: "🍽️",
      backgroundColor: "bg-amber-700",
      textColor: "text-white"
    },
    {
      title: "Doors & Windows",
      description: "Enhance your home with bespoke internal doors, expert external door installations, and beautiful custom window frames—complete with quality fittings.",
      icon: "🚪",
      backgroundColor: "bg-white",
      textColor: "text-gray-800"
    },
    {
      title: "Architectural Joinery",
      description: "Add character to your home with custom architectural features and decorative elements.",
      icon: "🛠️", 
      backgroundColor: "bg-white",
      textColor: "text-gray-800"
    }
  ];

  const fallbackProcess = {
    subtitle: "How We Works",
    title: "Get Started With Our Process",
    description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.",
    processSteps: [
      {
        title: "Planning",
        description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        stepNumber: "01",
        backgroundColor: "bg-[#8B572A]" as const,
        textColor: "text-white" as const
      },
      {
        title: "Brainstorming",
        description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        stepNumber: "02",
        backgroundColor: "bg-white" as const,
        textColor: "text-gray-800" as const
      },
      {
        title: "Targeting",
        description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        stepNumber: "03",
        backgroundColor: "bg-white" as const,
        textColor: "text-gray-800" as const
      }
    ]
  };

  useEffect(() => {
    async function fetchContentfulData() {
      try {
        const [services, servicesHeader, processSection, featuresSection, servicesHero] = await Promise.all([
          getServices(),
          getServicesHeader(),
          getProcessSection(),
          getFeaturesSection(),
          getServicesHero()
        ]);
        
        setServicesData(services.length > 0 ? services : fallbackServices);
        setServicesHeaderData(servicesHeader);
        setProcessData(processSection);
        setFeaturesData(featuresSection);
        setServicesHeroData(servicesHero);
        setFeaturesData(fallbackFeatures);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Contentful data:', error);
        setServicesData(fallbackServices);
        setServicesHeaderData(null);
        setProcessData(fallbackProcess);
        setFeaturesData(null);
        setServicesHeroData(fallbackHero);
        setFeaturesData(fallbackFeatures);
        setLoading(false);
      }
    }

    fetchContentfulData();
  }, []);

  // Scroll function for services carousel
  const scroll = (direction: "left" | "right") => {
    const container = document.querySelector('.overflow-x-auto');
    if (container) {
      const scrollAmount = 300;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const currentProcess = processData || fallbackProcess;
  const currentFeatures = featuresData || fallbackFeatures;

  // Icon mapping function
  const getIconComponent = (iconName: string) => {
    const iconMap: any = {
      'Target': <Target className="w-8 h-8" />,
      'Zap': <Zap className="w-8 h-8" />,
      'Shield': <Shield className="w-8 h-8" />,
      'CheckCircle': <CheckCircle className="w-8 h-8" />,
      'Award': <Award className="w-8 h-8" />,
      'Users': <Users className="w-8 h-8" />
    };
    return iconMap[iconName] || <Target className="w-8 h-8" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-[#855024] py-24 text-white overflow-hidden">
        <Image
          src={servicesHeroData?.backgroundImage ? 
            `https:${servicesHeroData.backgroundImage.fields.file.url}` : 
            `/${Math.floor(Math.random() * 8) + 1}.png`
          }
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="opacity-20"
        />
        <div className="absolute inset-0 bg-[#855024] opacity-60"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {servicesHeroData?.title || "Professional Carpentry & Joinery Services in London"}
          </h1>
          <p className="text-xl md:text-lg text-gray-200 leading-relaxed">
            {servicesHeroData?.subtitle || "Stay Joinery offers comprehensive carpentry and joinery services throughout Greater London. Our skilled craftsmen deliver exceptional results, from bespoke furniture to commercial fit-outs."}
          </p>
        </div>
      </div>

      {/* Features Section - Dynamic from Contentful */}
      <div className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-12">
            <p className="text-amber-600 font-semibold mb-2">{currentFeatures.subtitle}</p>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              {currentFeatures.title}
            </h2>
            <p className="text-gray-600 max-w-2xl">
              {currentFeatures.description}
            </p>
          </div>

          {/* Company Logo Watermark */}
          <div className="absolute right-8 top-1/2 transform -translate-y-1/2 opacity-10">
            <div className="w-32 h-32 rounded-full border-4 border-amber-300 flex items-center justify-center">
              <span className="text-2xl font-bold text-amber-600">SJ</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentFeatures.features.map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg ${feature.backgroundColor} ${feature.textColor || 'text-white'} shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-green-600 hover:text-white group`}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                  feature.iconBackgroundColor || 'bg-white bg-opacity-20'
                } ${feature.textColor === 'text-gray-800' ? 'text-white group-hover:text-white' : ''} group-hover:bg-white group-hover:bg-opacity-20`}>
                  {getIconComponent(feature.icon)}
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-white">{feature.title}</h3>
                <p className="opacity-90 group-hover:text-white group-hover:opacity-100">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Section - Same as Home Page */}
      <section className="bg-[#f5f5f0] py-16 relative">
        <div className="absolute right-0 top-0 h-full w-[300px] bg-contain bg-no-repeat bg-right" 
             style={{ 
               backgroundImage: servicesHeaderData?.backgroundImage ? 
                 `url(https:${servicesHeaderData.backgroundImage.fields.file.url})` : 
                 'url("/Ornament.png")' 
             }} 
        />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <p className="text-[#b46931] font-medium mb-2">
            {servicesHeaderData?.subtitle || "Our Services"}
          </p>
          <h2 className="text-3xl font-bold text-[#1b1b1b] mb-4">
            {servicesHeaderData?.title ? (
              servicesHeaderData.title.split(' ').length > 6 ? (
                <>
                  {servicesHeaderData.title.split(' ').slice(0, Math.ceil(servicesHeaderData.title.split(' ').length / 2)).join(' ')} <br />
                  {servicesHeaderData.title.split(' ').slice(Math.ceil(servicesHeaderData.title.split(' ').length / 2)).join(' ')}
                </>
              ) : (
                servicesHeaderData.title
              )
            ) : (
              <>Custom Furniture & Interior <br />Woodwork Built to Last.</>
            )}
          </h2>
          <p className="text-gray-600 mb-12 max-w-2xl">
            {servicesHeaderData?.description || "Our skilled London joiners combine time-honoured techniques with contemporary innovation to deliver"}
          </p>

          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {(servicesData.length > 0 ? servicesData : fallbackServices).map((item, idx) => (
              <div
                key={idx}
                className={`min-w-[280px] p-6 rounded-md shadow-sm ${
                  item.backgroundColor || 'bg-amber-800'
                } ${item.textColor || 'text-white'}`}
              >
                <div className="text-3xl mb-4 bg-white w-10 h-10 rounded-full flex items-center justify-center">
                  {item.icon || '🛠️'}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm opacity-80">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-6 space-x-4">
            <button 
              className="w-10 h-10 rounded-full bg-[#e4cc7f] text-white flex items-center justify-center"
              aria-label="Scroll left"
              onClick={() => scroll("left")}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              className="w-10 h-10 rounded-full bg-[#b49d2f] text-white flex items-center justify-center"
              aria-label="Scroll right"
              onClick={() => scroll("right")}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Process Section - Dynamic from Contentful */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-base text-gray-500 font-medium mb-2">{currentProcess.subtitle}</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {currentProcess.title}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {currentProcess.description}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {currentProcess.processSteps.map((step, index) => (
              <div key={index} className={`relative p-8 rounded-lg shadow-md ${step.backgroundColor} ${step.textColor}`}>
                <div className={`absolute -bottom-8 -left-8 text-[10rem] font-extrabold z-0 ${step.backgroundColor === 'bg-white' ? 'text-gray-200 opacity-80' : 'text-white opacity-10'}`}>
                  {step.stepNumber}
                </div>
                <h3 className="relative z-10 text-xl font-semibold mb-3">{step.title}</h3>
                <p className="relative z-10 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="h-2 bg-gradient-to-r from-amber-600 to-amber-800"></div>
    </div>
  );
};

export default CarpentryServicesPage;