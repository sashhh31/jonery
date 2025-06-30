"use client"
import Image from "next/image"
import { useEffect, useState } from "react"
import { 
  getAboutSection, 
  getGallerySection, 
  getAboutUsHero, 
  getTraditionalModernSection,
  AboutSection, 
  GallerySection,
  AboutUsHero,
  TraditionalModernSection
} from "../../lib/contentful"

export default function AboutUs() {
  const [aboutData, setAboutData] = useState<AboutSection | null>(null);
  const [galleryData, setGalleryData] = useState<GallerySection | null>(null);
  const [heroData, setHeroData] = useState<AboutUsHero | null>(null);
  const [traditionalData, setTraditionalData] = useState<TraditionalModernSection | null>(null);
  const [loading, setLoading] = useState(true);

  // Fallback data
  const fallbackHero = {
    title: "Master Craftsmen in London Carpentry & Joinery",
    subtitle: "Whether you need custom furniture making in London or professional carpentry services for your renovation project, Shay Joinery delivers exceptional quality and attention to detail.",
    backgroundImage: null
  };

  const fallbackTraditional = {
    title: "We are tradional & modern joinery business",
    description: "Based in Islington, our fully equipped London joinery workshop features state-of-the-art machinery alongside traditional hand tools. The combination enables us to handle projects of any size while maintaining the precision and quality that distinguish handmade joinery.",
    contactLinkText: "Contact Us",
    contactLinkUrl: "/contact-us",
    image: { fields: { file: { url: "/2.png" } } }
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

  useEffect(() => {
    async function fetchAboutData() {
      try {
        const [about, gallery, hero, traditional] = await Promise.all([
          getAboutSection(),
          getGallerySection(),
          getAboutUsHero(),
          getTraditionalModernSection()
        ]);
        
        setAboutData(about);
        setGalleryData(gallery);
        setHeroData(hero);
        setTraditionalData(traditional);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Contentful data:', error);
        setAboutData(fallbackAbout);
        setGalleryData(fallbackGallery);
        setHeroData(fallbackHero);
        setTraditionalData(fallbackTraditional);
        setLoading(false);
      }
    }

    fetchAboutData();
  }, []);

  const currentAbout = aboutData || fallbackAbout;
  const currentGallery = galleryData || fallbackGallery;
  const currentHero = heroData || fallbackHero;
  const currentTraditional = traditionalData || fallbackTraditional;

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

      {/* About Us Section */}
      <section className="bg-[#f5f5f0] section-padding">
        <div className="container">
          <div className="mb-4">
            <h2 className="text-lg text-gray-600">About Us</h2>
          </div>
          <div className="max-w-xl">
            <h3 className="section-title">{currentAbout.title}</h3>
            <p className="text-gray-700 mb-6">
              {currentAbout.description}
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
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="bg-white p-8 rounded-lg">
              <h4 className="font-bold text-xl mb-4">Our Vision</h4>
              <ul className="space-y-4">
                {(currentAbout.visionItems || []).map((item, index) => (
                  <VisionItem key={index} title={item.title} description={item.description} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Traditional & Modern Section - Dynamic from Contentful */}
      <section className="bg-[#f5f5f0] section-padding">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="section-title">{currentTraditional.title}</h3>
              <p className="text-gray-700 mb-6">
                {currentTraditional.description}
              </p>
              <a href={currentTraditional.contactLinkUrl} className="text-[#5a7d2a] font-medium hover:underline">
                {currentTraditional.contactLinkText}
              </a>
            </div>
            <div>
              <Image
                src={currentTraditional.image.fields.file.url.startsWith('http') ? 
                  currentTraditional.image.fields.file.url : 
                  `https:${currentTraditional.image.fields.file.url}`
                }
                alt="Our workshop"
                width={400}
                height={100}
                className="w-full h-auto rounded-lg"
              />
            </div>
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
                  width={400}
                  height={item.gridSpan === 'col-span-full' ? 400 : 300}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function VisionItem({ title, description }: { title: string; description: string }) {
  return (
    <li className="flex items-start">
      <div className="mt-1 mr-3 w-5 h-5 rounded-full bg-[#5a7d2a] flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-3 h-3"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <div>
        <h5 className="font-bold">{title}:</h5>
        <p className="text-gray-600">{description}</p>
      </div>
    </li>
  )
}
