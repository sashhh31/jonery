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
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogOverlay } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

const CarpentryServicesPage = () => {
  const [servicesData, setServicesData] = useState<Service[]>([]);
  const [servicesHeaderData, setServicesHeaderData] = useState<ServicesHeader | null>(null);
  const [processData, setProcessData] = useState<ProcessSection | null>(null);
  const [featuresData, setFeaturesData] = useState<FeaturesSection | null>(null);
  const [servicesHeroData, setServicesHeroData] = useState<ServicesHero | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const { toast } = useToast();
  const [form, setForm] = useState<{
    name: string;
    email: string;
    phone: string;
    projectType: string;
    propertyLocation: string;
    projectDescription: string;
    preferredContact: string;
    Timeline: string;
  }>({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    propertyLocation: '',
    projectDescription: '',
    preferredContact: '',
    Timeline: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const projectTypes = [
    'Furniture',
    'Kitchen',
    'Doors/Windows',
    'Flooring Services',
    'Commercial',
    'Other'
  ];
  const contactMethods = [
    'Email',
    'Phone'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSelectChange = (value: string) => {
    setForm({ ...form, projectType: value });
  };
  const handleRadioChange = (value: string) => {
    setForm({ ...form, preferredContact: value });
  };
  const handleOpen = (service: string) => {
    setSelectedService(service);
    // Don't auto-fill the projectType, let user select manually
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedService(null);
    setForm({
      name: '',
      email: '',
      phone: '',
      projectType: '',
      propertyLocation: '',
      projectDescription: '',
      preferredContact: '',
      Timeline: ''
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.projectType || form.projectType === '') {
      toast({ title: 'Please select a service type', description: 'You must select a project type before submitting.', variant: 'destructive' });
      return;
    }
    setSubmitting(true);
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!response.ok) throw new Error('Failed to send');
      toast({ title: 'Done', description: 'Your enquiry has been sent successfully.' });
      handleClose();
    } catch (err) {
      toast({ title: 'Failed to send enquiry', description: 'Please try again later.', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

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
    subtitle: "How We Work",
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
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            {(() => {
              const title = servicesHeroData?.title || "Professional Carpentry & Joinery Services in London";
              const words = title.split(' ');
              const mid = Math.ceil(words.length / 2);
              return <>{words.slice(0, mid).join(' ')}<br />{words.slice(mid).join(' ')}</>;
            })()}
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            {servicesHeroData?.subtitle || "Stay Joinery offers comprehensive carpentry and joinery services throughout Greater London. Our skilled craftsmen deliver exceptional results, from bespoke furniture to commercial fit-outs."}
          </p>
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
                id={item.title.replace(/\s+/g, '-').replace(/&/g, '&').replace(/[^a-zA-Z0-9-&]/g, '')}
                className={`relative min-w-[280px] p-6 pt-14 rounded-md shadow-sm ${item.backgroundColor || 'bg-amber-800'} ${item.textColor || 'text-white'} flex flex-col justify-between`}
                style={{ minHeight: '320px' }}
              >
                {/* Icon/Letter fixed in top-left */}
                <div className="absolute top-4 left-4 text-3xl bg-white bg-opacity-20 w-12 h-12 rounded-full flex items-center justify-center shadow-md">
                  {item.icon || '🛠️'}
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <h3 className="text-lg font-semibold mb-2 mt-2">{item.title}</h3>
                  <p className="text-sm opacity-90 mb-4">{item.description}</p>
                </div>
                <span
                  role="button"
                  tabIndex={0}
                  onClick={() => handleOpen(item.title)}
                  onKeyPress={e => { if (e.key === 'Enter' || e.key === ' ') handleOpen(item.title); }}
                  className="mt-auto w-fit cursor-pointer text-base font-semibold transition-colors duration-200 relative group focus:outline-none focus:underline"
                  style={{ display: 'inline-block' }}
                >
                Request Free Estimate
                  <span className="inline-block transition-all duration-200 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 ml-1">→</span>
                  <span className="block h-0.5 bg-current scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left mt-1" style={{width:'100%'}}></span>
                </span>
              </div>
            ))}
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            {/* Custom DialogOverlay for blur and opacity */}
            <DialogOverlay className="bg-black/60 backdrop-blur-sm" />
            <DialogContent
              className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl p-8 max-w-lg w-full transition-all duration-300 border border-gray-200"
            >
              <DialogHeader>
                <DialogTitle>Project Enquiry Form</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input name="name" placeholder="Name" value={form.name} onChange={handleInputChange} required />
                <Input name="email" type="email" placeholder="Email" value={form.email} onChange={handleInputChange} required />
                <Input name="phone" type="tel" placeholder="Phone" value={form.phone} onChange={handleInputChange} />
                <Select value={form.projectType} onValueChange={handleSelectChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Service" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {projectTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input name="propertyLocation" placeholder="Property Location" value={form.propertyLocation} onChange={handleInputChange} />
                <Textarea name="projectDescription" placeholder="Project Description" value={form.projectDescription} onChange={handleInputChange} />
                <div>
                  <label className="block mb-1 font-medium">Preferred Contact Method</label>
                  <RadioGroup value={form.preferredContact} onValueChange={handleRadioChange} className="flex gap-4">
                    {contactMethods.map(method => (
                      <div key={method} className="flex items-center gap-2">
                        <RadioGroupItem value={method} id={method} />
                        <label htmlFor={method} className="text-gray-700 cursor-pointer">{method}</label>
                      </div>
                    ))}
                  </RadioGroup>
                  {form.preferredContact === 'Phone' && (
                    <Input
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={form.phone}
                      onChange={handleInputChange}
                      required
                      className="mt-2"
                    />
                  )}
                </div>
                <Input name="Timeline" placeholder="Tell us how soon you want your project started!" value={form.Timeline} onChange={handleInputChange} />
                <DialogFooter>
                  <Button type="submit" disabled={submitting} className="text-white">{submitting ? 'Sending...' :"Let's Talk"}</Button>
                  <DialogClose asChild>
                    <Button type="button" variant="outline" onClick={handleClose}>Cancel</Button>
                  </DialogClose>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
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