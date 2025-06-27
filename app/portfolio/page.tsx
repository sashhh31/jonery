"use client"
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User } from 'lucide-react';
import Image from "next/image";
import { getPortfolioHero, getOngoingProjectsSection, getCompletedProjectsSection, PortfolioHero, OngoingProjectsSection, CompletedProjectsSection, Project } from '../../lib/contentful';

const CarpentryProjectsPage = () => {
  const [portfolioHeroData, setPortfolioHeroData] = useState<PortfolioHero | null>(null);
  const [ongoingProjectsData, setOngoingProjectsData] = useState<OngoingProjectsSection | null>(null);
  const [completedProjectsData, setCompletedProjectsData] = useState<CompletedProjectsSection | null>(null);
  const [loading, setLoading] = useState(true);

  const fallbackHero = {
    title: "Our London Carpentry & Joinery Projects",
    description: "Discover our portfolio, showcasing exceptional carpentry and joinery work throughout London. From luxury residential projects in Kensington to commercial fit-outs in the city, each project demonstrates our commitment to quality craftsmanship.",
    backgroundImage: null
  };

  const fallbackOngoingProjects = {
    sectionTitle: "Ongoing Projects",
    projects: [
      {
        title: "Belgravia Townhouse Restoration",
        client: "Laing O'Rourke",
        startedOn: "Apr 10, 2024",
        completedOn: "Ongoing",
        status: "ongoing" as const,
        description: "Complete restoration of a historic townhouse in Belgravia, including custom joinery, period-accurate moldings, and bespoke furniture pieces.",
        image: { fields: { file: { url: `/${Math.floor(Math.random() * 8) + 1}.png` } } }
      },
      {
        title: "Modern Kitchen Design, Notting Hill",
        client: "Laing O'Rourke",
        startedOn: "Apr 10, 2024",
        completedOn: "Ongoing",
        status: "ongoing" as const,
        description: "Contemporary kitchen renovation featuring custom cabinetry, integrated appliances, and a unique breakfast bar design with premium materials.",
        image: { fields: { file: { url: `/${Math.floor(Math.random() * 8) + 1}.png` } } }
      }
    ]
  };

  const fallbackCompletedProjects = {
    sectionTitle: "All Completed Projects",
    projects: [
      {
        title: "City of London Office Fit-out",
        client: "Laing O'Rourke",
        startedOn: "Apr 10, 2024",
        completedOn: "Apr 10, 2025",
        status: "completed" as const,
        description: "Modern office space transformation with custom-built workstations, meeting room furniture, and reception area joinery.",
        image: { fields: { file: { url: `/${Math.floor(Math.random() * 8) + 1}.png` } } }
      },
      {
        title: "Shoreditch Restaurant Interior",
        client: "Laing O'Rourke",
        startedOn: "Apr 10, 2024",
        completedOn: "Apr 10, 2025",
        status: "completed" as const,
        description: "Industrial-chic restaurant interior featuring custom banquette seating, bar counter, and decorative wooden elements.",
        image: { fields: { file: { url: `/${Math.floor(Math.random() * 8) + 1}.png` } } }
      },
      {
        title: "Hampstead Family Home",
        client: "Laing O'Rourke",
        startedOn: "Apr 10, 2024",
        completedOn: "Apr 10, 2025",
        status: "completed" as const,
        description: "Complete home renovation including custom wardrobes, built-in storage solutions, and bespoke furniture pieces.",
        image: { fields: { file: { url: `/${Math.floor(Math.random() * 8) + 1}.png` } } }
      }
    ]
  };

  useEffect(() => {
    async function fetchPortfolioData() {
      try {
        const [heroData, ongoingData, completedData] = await Promise.all([
          getPortfolioHero(),
          getOngoingProjectsSection(),
          getCompletedProjectsSection()
        ]);
        
        setPortfolioHeroData(heroData);
        setOngoingProjectsData(ongoingData);
        setCompletedProjectsData(completedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
        setPortfolioHeroData(fallbackHero);
        setOngoingProjectsData(fallbackOngoingProjects);
        setCompletedProjectsData(fallbackCompletedProjects);
        setLoading(false);
      }
    }

    fetchPortfolioData();
  }, []);

  const currentHero = portfolioHeroData || fallbackHero;
  const currentOngoingProjects = ongoingProjectsData && ongoingProjectsData.projects && ongoingProjectsData.projects.length > 0 ? ongoingProjectsData : fallbackOngoingProjects;
  const currentCompletedProjects = completedProjectsData && completedProjectsData.projects && completedProjectsData.projects.length > 0 ? completedProjectsData : fallbackCompletedProjects;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#925422] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  const ProjectCard = ({ project, isOngoing = false }: { project: any, isOngoing: boolean }) => {
    let imageUrl = "/placeholder.png";
    if (Array.isArray(project.image) && project.image[0]?.fields?.file?.url) {
      imageUrl = project.image[0].fields.file.url.startsWith('http')
        ? project.image[0].fields.file.url
        : `https:${project.image[0].fields.file.url}`;
    } else if (project.image?.fields?.file?.url) {
      imageUrl = project.image.fields.file.url.startsWith('http')
        ? project.image.fields.file.url
        : `https:${project.image.fields.file.url}`;
    }
    return (
      <div className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:bg-amber-50">
        <div className="relative">
          <img 
            src={imageUrl}
            alt={project.title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {isOngoing && (
            <div className="absolute top-3 right-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Ongoing
            </div>
          )}
        </div>
        
        <div className="p-6 relative">
          <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-amber-800 transition-colors duration-300">{project.title}</h3>
          
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center group-hover:text-amber-700 transition-colors duration-300">
              <User className="w-4 h-4 mr-2 text-amber-600" />
              <span className="font-medium">Client:</span>
              <span className="ml-2 text-blue-600 group-hover:text-blue-700">{project.client}</span>
            </div>
            
            <div className="flex items-center group-hover:text-amber-700 transition-colors duration-300">
              <Calendar className="w-4 h-4 mr-2 text-amber-600" />
              <span className="font-medium">Started On:</span>
              <span className="ml-2">{project.startedOn}</span>
            </div>
            
            <div className="flex items-center group-hover:text-amber-700 transition-colors duration-300">
              <Clock className="w-4 h-4 mr-2 text-amber-600" />
              <span className="font-medium">Completed On:</span>
              <span className={`ml-2 ${project.completedOn === 'Ongoing' ? 'text-orange-600 font-semibold' : ''}`}>
                {project.completedOn}
              </span>
            </div>
          </div>

          {/* Description overlay on hover */}
          <div className="absolute inset-0 bg-amber-50 bg-opacity-95 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center">
            <p className="text-gray-700 text-sm leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Dynamic from Contentful */}
      <div className="relative bg-[#855024] py-24 text-white overflow-hidden">
        <Image
          src={currentHero.backgroundImage ? 
            `https:${currentHero.backgroundImage.fields.file.url}` : 
            `/${Math.floor(Math.random() * 8) + 1}.png`
          }
          alt="Portfolio Background"
          layout="fill"
          objectFit="cover"
          className="opacity-20"
        />
        <div className="absolute inset-0 bg-[#855024] opacity-60"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {currentHero.title}
          </h1>
          <p className="text-lg md:text-lg text-gray-200 max-w-4xl mx-auto leading-relaxed">
            {currentHero.description}
          </p>
        </div>
      </div>

      {/* Ongoing Projects Section - Dynamic from Contentful */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-gray-800 mb-12">{currentOngoingProjects.sectionTitle}</h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {currentOngoingProjects.projects.map((project, index) => (
            <ProjectCard key={`${project.title}-${index}`} project={project} isOngoing={true} />
          ))}
        </div>
      </div>

      {/* Completed Projects Section - Dynamic from Contentful */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-800 mb-12">{currentCompletedProjects.sectionTitle}</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentCompletedProjects.projects.map((project, index) => (
              <ProjectCard key={`${project.title}-${index}`} project={project} isOngoing={false} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="h-2 bg-gradient-to-r from-amber-600 to-amber-800"></div>
    </div>
  );
};

export default CarpentryProjectsPage;