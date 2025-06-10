"use client"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, ChevronLeft, Armchair, CookingPot, DoorOpen, Check, Building2 } from "lucide-react"
import { useRef, useEffect, useState } from "react"
import { 
  getHeroSection, 
  getServices, 
  getAboutSection, 
  getServicesHeader, 
  getGallerySection,
  getGalleryItems,
  getTestimonialsSection,
  HeroSection, 
  Service, 
  AboutSection, 
  ServicesHeader, 
  GallerySection,
  GalleryItem,
  TestimonialsSection
} from '../lib/contentful'

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [heroData, setHeroData] = useState<HeroSection | null>(null);
  const [servicesData, setServicesData] = useState<Service[]>([]);
  const [aboutData, setAboutData] = useState<AboutSection | null>(null);
  const [servicesHeaderData, setServicesHeaderData] = useState<ServicesHeader | null>(null);
  const [galleryData, setGalleryData] = useState<GallerySection | null>(null);
  const [galleryItemsData, setGalleryItemsData] = useState<GalleryItem[]>([]);
  const [testimonialsData, setTestimonialsData] = useState<TestimonialsSection | null>(null);
  const [loading, setLoading] = useState(true);

  // Fallback data (current hardcoded data)
  const fallbackServices = [
    {
      title: "Bespoke Furniture & Cabinetry",
      description:
        "Transform your home with custom handcrafted furniture, including wardrobes, storage units, desks, media centers, and display cabinets—designed to fit your space perfectly.",
      icon: "🪑",
      backgroundColor: "bg-[#8b572a]",
      textColor: "text-white",
    },
    {
      title: "Kitchen Carpentry Services",
      description:
        "Create your dream kitchen with custom carpentry—handmade cabinets, solid wood worktops, islands, pantries, and tailored storage solutions built just for you.",
      icon: "🍽️",
      backgroundColor: "bg-white",
      textColor: "text-black",
    },
    {
      title: "Doors & Windows",
      description:
        "Enhance your home with bespoke internal doors, expert external door and sash window restoration, and custom window frames—complete with quality fittings.",
      icon: "🚪",
      backgroundColor: "bg-white",
      textColor: "text-black",
    },
    {
      title: "Architectural Joinery",
      description:
        "Add charm with custom cornices, ceiling roses, and timber mouldings crafted to perfection by experienced joiners.",
      icon: "🛠️",
      backgroundColor: "bg-white",
      textColor: "text-black",
    },
  ];

  const fallbackHero = {
    title: "Bespoke Carpentry & Joinery Services in London",
    subtitle: "Transform your space with Shay Joinery – London's trusted specialists in carpentry and joinery. From custom kitchens to handcrafted furniture, we bring over 20+ years of expertise to every project.",
    ctaText: "Get Started",
    ctaLink: "/contact-us",
    backgroundImage: null
  };

  const fallbackAbout = {
    title: "Building with Heart, Crafting with Skill.",
    subtitle: "About Us",
    description: "Shay Joinery provides professional commercial joinery services throughout London. We've completed office fit-outs in Canary Wharf, restaurant interiors in Soho, and retail displays in Covent Garden. Our commercial carpentry team understands the importance of durability, functionality, and aesthetic appeal in business environments.",
    visionItems: [
      { title: "Craftsmanship", description: "Every piece showcases meticulous attention to detail" },
      { title: "Sustainability", description: "We source timber from certified sustainable forests" },
      { title: "Innovation", description: "Combining traditional joinery techniques with modern technology" },
      { title: "Customer Focus", description: "Your satisfaction drives everything we do" },
      { title: "Local Expertise", description: "Deep knowledge of London properties and building regulations" }
    ],
    image: null
  };

  const fallbackServicesHeader = {
    subtitle: "Our Services",
    title: "Custom Furniture & Interior Woodwork Built to Last.",
    description: "Our skilled London joiners combine time-honoured techniques with contemporary innovation to deliver",
    backgroundImage: null
  };

  const fallbackGallery = {
    subtitle: "Gallery",
    title: "Get To Know Us",
    galleryItems: [
      {
        title: "Factory interior",
        image: { fields: { file: { url: "/3.png" } } },
        gridSpan: "col-span-1" as const
      },
      {
        title: "Living room with shelves",
        image: { fields: { file: { url: "/4.png" } } },
        gridSpan: "col-span-1 md:col-span-2" as const
      },
      {
        title: "Living room with shelves (smaller crop)",
        image: { fields: { file: { url: "/5.png" } } },
        gridSpan: "col-span-1" as const
      },
      {
        title: "Hands working with wood",
        image: { fields: { file: { url: "/6.png" } } },
        gridSpan: "col-span-1" as const
      },
      {
        title: "Workshop machines", 
        image: { fields: { file: { url: "/6.png" } } },
        gridSpan: "col-span-1" as const
      },
      {
        title: "Modern luxury living room",
        image: { fields: { file: { url: "/4.png" } } },
        gridSpan: "col-span-full" as const
      }
    ]
  };

  const fallbackTestimonials = {
    subtitle: "Testimonials",
    title: "What Our Customer Says!!",
    testimonials: [
      {
        quote: "Shay Joinery transformed our Victorian terrace with beautiful bespoke carpentry. Their attention to detail is exceptional.",
        name: "Sarah M",
        location: "Clapham",
        image: { fields: { file: { url: "/7.png" } } }
      },
      {
        quote: "Professional, reliable, and incredibly skilled. The fitted wardrobes they created maximised every inch of our bedroom.",
        name: "James T", 
        location: "Islington",
        image: { fields: { file: { url: "/8.png" } } }
      }
    ]
  };

  useEffect(() => {
    async function fetchContentfulData() {
      try {
        const [hero, services, about, servicesHeader, gallery, testimonials] = await Promise.all([
          getHeroSection(),
          getServices(),
          getAboutSection(),
          getServicesHeader(),
          getGallerySection(),
          getTestimonialsSection()
        ]);

        // Also try direct gallery items fetch
        const directGalleryItems = await getGalleryItems();
        
        setHeroData(hero);
        setServicesData(services.length > 0 ? services : fallbackServices);
        setAboutData(about);
        setServicesHeaderData(servicesHeader);
        setGalleryData(gallery);
        setGalleryItemsData(directGalleryItems.length > 0 ? directGalleryItems : fallbackGallery.galleryItems);
        setTestimonialsData(testimonials);
        
        console.log('Gallery Section:', gallery);
        console.log('Direct Gallery Items:', directGalleryItems);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Contentful data:', error);
        // Use fallback data if Contentful fails
        setHeroData(fallbackHero);
        setServicesData(fallbackServices);
        setAboutData(fallbackAbout);
        setServicesHeaderData(fallbackServicesHeader);
        setGalleryData(fallbackGallery);
        setGalleryItemsData(fallbackGallery.galleryItems);
        setTestimonialsData(fallbackTestimonials);
        setLoading(false);
      }
    }

    fetchContentfulData();
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  // Use Contentful data or fallback
  const currentHero = heroData || fallbackHero;
  const currentServices = servicesData.length > 0 ? servicesData : fallbackServices;
  const currentAbout = aboutData || fallbackAbout;
  const currentServicesHeader = servicesHeaderData || fallbackServicesHeader;
  const currentGallery = galleryData || fallbackGallery;
  const currentTestimonials = testimonialsData || {
    subtitle: "Testimonials",
    title: "What Our Customer Says!!",
    testimonials: [
      {
        quote: "Shay Joinery transformed our Victorian terrace with beautiful bespoke carpentry. Their attention to detail is exceptional.",
        name: "Sarah M",
        location: "Clapham",
        image: { fields: { file: { url: "/7.png" } } }
      },
      {
        quote: "Professional, reliable, and incredibly skilled. The fitted wardrobes they created maximised every inch of our bedroom.",
        name: "James T", 
        location: "Islington",
        image: { fields: { file: { url: "/8.png" } } }
      }
    ]
  };

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
    <>
      {/* Hero Section - Now with Contentful Data */}
      <section className="relative bg-[#925422] py-32 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={currentHero.backgroundImage ? 
              `https:${currentHero.backgroundImage.fields.file.url}` : 
              `/${Math.floor(Math.random() * 8) + 1}.png`
            }
            alt="Background"
            fill
            style={{ objectFit: 'cover' }}
            className="opacity-20"
          />
          <div className="absolute inset-0 bg-[#855024] opacity-40"></div>
        </div>
        <div className="container relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
            {currentHero.title}
          </h1>
          <p className="mb-8 text-xl text-gray-300 max-w-2xl mx-auto">
            {currentHero.subtitle}
          </p>
          <Link 
            href={currentHero.ctaLink} 
            className="inline-block bg-[#d4ac29] hover:bg-[#c39c25] text-black py-3 px-8 rounded-full font-semibold"
          >
            {currentHero.ctaText}
          </Link>
        </div>
      </section>

      <section className="bg-[#f5f5f0] section-padding">
        <div className="container">
          <div className="mb-4">
            <h2 className="text-lg text-gray-600">{currentAbout.subtitle}</h2>
          </div>
          <div className="max-w-xl">
            <h3 className="section-title">{currentAbout.title}</h3>
            <p className="text-gray-700 mb-6">
              {typeof currentAbout.description === 'string' 
                ? currentAbout.description 
                : 'Description content from Contentful'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            <div>
              <Image
                src={currentAbout.image ? 
                  `https:${currentAbout.image.fields.file.url}` : 
                  "/1.png"
                }
                alt="Our workshop"
                width={600}
                height={400}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
            <div className="bg-white p-8 rounded-lg">
              <h4 className="font-bold text-xl mb-4">Our Vision</h4>
              <ul className="space-y-4">
                {(currentAbout.visionItems || []).map((item, index) => (
                  <VisionItem 
                    key={index}
                    title={item.title} 
                    description={item.description} 
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-[#f5f5f0] py-16 relative">
      <div className="absolute right-0 top-0 h-full w-[300px] bg-contain bg-no-repeat bg-right" 
           style={{ 
             backgroundImage: currentServicesHeader.backgroundImage ? 
               `url(https:${currentServicesHeader.backgroundImage.fields.file.url})` : 
               'url("/Ornament.png")' 
           }} 
      />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <p className="text-[#b46931] font-medium mb-2">{currentServicesHeader.subtitle}</p>
        <h2 className="text-3xl font-bold text-[#1b1b1b] mb-4">
          {currentServicesHeader.title.split(' ').length > 6 ? (
            <>
              {currentServicesHeader.title.split(' ').slice(0, Math.ceil(currentServicesHeader.title.split(' ').length / 2)).join(' ')} <br />
              {currentServicesHeader.title.split(' ').slice(Math.ceil(currentServicesHeader.title.split(' ').length / 2)).join(' ')}
            </>
          ) : (
            currentServicesHeader.title
          )}
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl">
          {currentServicesHeader.description}
        </p>

        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {currentServices.map((item, idx) => (
            <div
              key={idx}
              className={`min-w-[280px] p-6 rounded-md shadow-sm ${
                item.backgroundColor
              } ${item.textColor}`}
            >
              <div className="text-3xl mb-4 bg-white w-10 h-10 rounded-full flex items-center justify-center">{item.icon}</div>
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

      {/* Gallery Section - Dynamic from Contentful */}
      <section className="bg-[#f5f5f0] section-padding">
        <div className="container">
          <h2 className="text-center text-xl mb-6">{currentGallery.subtitle}</h2>
          <h3 className="text-center section-title mb-10">{currentGallery.title}</h3>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-0">
            {currentGallery.galleryItems.map((item, index) => (
              <div key={index} className={`${item.gridSpan} overflow-hidden`}>
                <Image
                  src={item.image.fields.file.url.startsWith('http') ? 
                    item.image.fields.file.url : 
                    `https:${item.image.fields.file.url}`
                  }
                  alt={item.title}
                  width={item.gridSpan === 'col-span-full' ? 1200 : 
                         item.gridSpan === 'col-span-1 md:col-span-2' ? 800 : 400}
                  height={item.gridSpan === 'col-span-full' ? 400 : 300}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Testimonials Section - Dynamic from Contentful */}
      <section className="bg-[#f5f5f0] section-padding">
        <div className="container">
          <h2 className="text-center text-lg text-gray-600 mb-2">{currentTestimonials.subtitle}</h2>
          <h3 className="text-center section-title mb-10">{currentTestimonials.title}</h3>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentTestimonials.testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  quote={testimonial.quote}
                  name={testimonial.name}
                  location={testimonial.location}
                  image={testimonial.image.fields.file.url.startsWith('http') ? 
                    testimonial.image.fields.file.url : 
                    `https:${testimonial.image.fields.file.url}`
                  }
                />
              ))}
            </div>

            {/* Fixed Arrow Positioning - More Gap */}
            <button 
              className="absolute -left-16 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 z-10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <button 
              className="absolute -right-16 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 z-10"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

function ServiceCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="w-12 h-12 bg-[#a67c52] rounded-full flex items-center justify-center mb-4">
        {icon === "furniture" && <Armchair className="w-6 h-6 text-white" />}
        {icon === "kitchen" && <CookingPot className="w-6 h-6 text-white" />}
        {icon === "door" && <DoorOpen className="w-6 h-6 text-white" />}
        {icon === "building" && <Building2 className="w-6 h-6 text-white" />}
      </div>
      <h3 className="font-bold text-xl mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function VisionItem({ title, description }: { title: string; description: string }) {
  return (
    <li className="flex items-start">
      <div className="mt-1 mr-3 w-5 h-5 rounded-full bg-[#5a7d2a] flex items-center justify-center">
        <Check className="w-3 h-3 text-white" />
      </div>
      <div>
        <h5 className="font-bold">{title}:</h5>
        <p className="text-gray-600">{description}</p>
      </div>
    </li>
  )
}

function TestimonialCard({
  quote,
  name,
  location,
  image,
}: { quote: string; name: string; location: string; image: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <p className="text-gray-700 mb-4">"{quote}"</p>
      <div className="flex items-center">
        <Image src={image || "/placeholder.svg"} alt={name} width={40} height={40} className="rounded-full mr-3" />
        <div>
          <h4 className="font-bold">{name}</h4>
          <p className="text-gray-600 text-sm">{location}</p>
        </div>
      </div>
    </div>
  )
}
