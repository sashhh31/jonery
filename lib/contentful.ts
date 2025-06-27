import { createClient } from 'contentful';

export const client = createClient({
  space: 'lo2l4nmpv3dn',
  accessToken: '_aubXQgaIezmAf0CwS-7pXbpUvuEvPTOPmz7Qn45w44',
});

// Types for our content models
export interface Service {
  title: string;
  description: string;
  icon: string;
  backgroundColor: string;
  textColor: string;
}

export interface HeroSection {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: {
    fields: {
      file: {
        url: string;
      };
    };
  } | null;
}

export interface AboutSection {
  title: string;
  subtitle: string;
  description: string;
  visionItems?: VisionItem[];
  image?: {
    fields: {
      file: {
        url: string;
      };
    };
  } | null;
}

export interface VisionItem {
  title: string;
  description: string;
}

export interface GalleryImage {
  title: string;
  image: {
    fields: {
      file: {
        url: string;
      };
    };
  };
}

// Footer Types
export interface FooterContent {
  logo?: {
    fields: {
      file: {
        url: string;
      };
    };
  } | null;
  description: string;
  socialLinks: SocialLink[];
  serviceLinks: FooterLink[];
  companyLinks: FooterLink[];
  supportLinks: FooterLink[];
  copyrightText: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface FooterLink {
  label: string;
  url: string;
}

// Header Types
export interface HeaderContent {
  logo: {
    fields: {
      file: {
        url: string;
      };
    };
  };
  businessHours: string;
  phone: string;
  address: string;
  socialLinks: HeaderSocialLink[];
}

export interface HeaderSocialLink {
  platform: string;
  url: string;
}

// Services Header Types
export interface ServicesHeader {
  subtitle: string;
  title: string;
  description: string;
  backgroundImage?: {
    fields: {
      file: {
        url: string;
      };
    };
  } | null;
}

// Gallery interfaces
export interface GalleryItem {
  title: string;
  description?: string;
  image: {
    fields: {
      file: {
        url: string;
      };
    };
  };
  gridSpan: 'col-span-1' | 'col-span-1 md:col-span-2' | 'col-span-full';
}

export interface GallerySection {
  subtitle: string;
  title: string;
  galleryItems: GalleryItem[];
}

// Testimonials interfaces
export interface Testimonial {
  quote: string;
  name: string;
  location: string;
  image: {
    fields: {
      file: {
        url: string;
      };
    };
  };
}

export interface TestimonialsSection {
  subtitle: string;
  title: string;
  testimonials: Testimonial[];
}

// Helper functions to fetch content
export async function getServices(): Promise<Service[]> {
  try {
    const response = await client.getEntries({
      content_type: 'service',
    });

    return response.items.map((item: any) => ({
      title: item.fields.title,
      description: item.fields.description,
      icon: item.fields.icon,
      backgroundColor: item.fields.backgroundColor,
      textColor: item.fields.textColor,
    }));
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

export async function getHeroSection(): Promise<HeroSection | null> {
  try {
    const response = await client.getEntries({
      content_type: 'heroSection',
      limit: 1,
    });

    if (response.items.length === 0) return null;

    const item = response.items[0];
    return {
      title: item.fields.title,
      subtitle: item.fields.subtitle,
      ctaText: item.fields.ctaText,
      ctaLink: item.fields.ctaLink,
      backgroundImage: item.fields.backgroundImage,
    } as HeroSection;
  } catch (error) {
    console.error('Error fetching hero section:', error);
    return null;
  }
}

export async function getAboutSection(): Promise<AboutSection | null> {
  try {
    const response = await client.getEntries({
      content_type: 'aboutSection',
      limit: 1,
    });

    if (response.items.length === 0) return null;

    const item: any = response.items[0];
    return {
      title: item.fields.title,
      subtitle: item.fields.subtitle,
      description: item.fields.description,
      visionItems: item.fields.visionItems || [],
      image: item.fields.image,
    };
  } catch (error) {
    console.error('Error fetching about section:', error);
    return null;
  }
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  try {
    const response = await client.getEntries({
      content_type: 'galleryImage',
    });

    return response.items.map((item: any) => ({
      title: item.fields.title,
      image: item.fields.image,
    }));
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return [];
  }
}

export async function getFooterContent(): Promise<FooterContent | null> {
  try {
    const response = await client.getEntries({
      content_type: 'footerContent',
      limit: 1,
    });

    if (response.items.length === 0) return null;

    const item: any = response.items[0];
    return {
      logo: item.fields.logo,
      description: item.fields.description,
      socialLinks: item.fields.socialLinks || [],
      serviceLinks: item.fields.serviceLinks || [],
      companyLinks: item.fields.companyLinks || [],
      supportLinks: item.fields.supportLinks || [],
      copyrightText: item.fields.copyrightText,
    };
  } catch (error) {
    console.error('Error fetching footer content:', error);
    return null;
  }
}

export async function getHeaderContent(): Promise<HeaderContent | null> {
  try {
    const response = await client.getEntries({
      content_type: 'headerContent',
      limit: 1,
    });

    if (response.items.length === 0) return null;

    const item: any = response.items[0];
    return {
      logo: item.fields.logo,
      businessHours: item.fields.businessHours,
      phone: item.fields.phone,
      address: item.fields.address,
      socialLinks: item.fields.socialLinks || [],
    };
  } catch (error) {
    console.error('Error fetching header content:', error);
    return null;
  }
}

export async function getServicesHeader(): Promise<ServicesHeader | null> {
  try {
    const response = await client.getEntries({
      content_type: 'servicesHeader',
      limit: 1,
    });

    if (response.items.length === 0) return null;

    const item: any = response.items[0];
    return {
      subtitle: item.fields.subtitle,
      title: item.fields.title,
      description: item.fields.description,
      backgroundImage: item.fields.backgroundImage,
    };
  } catch (error) {
    console.error('Error fetching services header:', error);
    return null;
  }
}

// Gallery functions
export async function getGallerySection(): Promise<GallerySection | null> {
  try {
    const entries = await client.getEntries({
      content_type: 'gallerySection',
      limit: 1,
      include: 2 // This will include linked gallery items
    });

    if (entries.items.length === 0) {
      console.log('No gallery section found');
      return null;
    }

    const entry = entries.items[0] as any;
    
    const galleryItems = (entry.fields.galleryItem || []).map((item: any) => ({
      title: item.fields.title || '',
      description: item.fields.description || '',
      image: item.fields.image,
      gridSpan: item.fields.gridSpan || 'col-span-1'
    }));

    return {
      subtitle: entry.fields.subtitle || 'Gallery',
      title: entry.fields.title || 'Get To Know Us',
      galleryItems: galleryItems
    };
  } catch (error) {
    console.error('Error fetching gallery section:', error);
    return null;
  }
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  try {
    const entries = await client.getEntries({
      content_type: 'galleryItem',
      order: ['fields.order']
    });

    return entries.items.map((entry: any) => ({
      title: entry.fields.title || '',
      description: entry.fields.description || '',
      image: entry.fields.image,
      gridSpan: entry.fields.gridSpan || 'col-span-1'
    }));
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    return [];
  }
}

// Testimonials functions
export async function getTestimonialsSection(): Promise<TestimonialsSection | null> {
  try {
    const entries = await client.getEntries({
      content_type: 'testimonialsSection',
      limit: 1,
      include: 2 // Include linked testimonials
    });

    if (entries.items.length === 0) return null;

    const entry = entries.items[0] as any;
    return {
      subtitle: entry.fields.subtitle || 'Testimonials',
      title: entry.fields.title || 'What Our Customer Says!!',
      testimonials: (entry.fields.testimonial || []).map((item: any) => ({
        quote: item.fields.quote || '',
        name: item.fields.name || '',
        location: item.fields.location || '',
        image: item.fields.image
      }))
    };
  } catch (error) {
    console.error('Error fetching testimonials section:', error);
    return null;
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const entries = await client.getEntries({
      content_type: 'testimonial',
      order: ['fields.order']
    });

    return entries.items.map((entry: any) => ({
      quote: entry.fields.quote || '',
      name: entry.fields.name || '',
      location: entry.fields.location || '',
      image: entry.fields.image
    }));
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}

// About Us Page specific interfaces
export interface AboutUsHero {
  title: string;
  subtitle: string;
  backgroundImage?: {
    fields: {
      file: {
        url: string;
      };
    };
  } | null;
}

export interface TraditionalModernSection {
  title: string;
  description: string;
  contactLinkText: string;
  contactLinkUrl: string;
  image: {
    fields: {
      file: {
        url: string;
      };
    };
  };
}

// About Us specific functions
export async function getAboutUsHero(): Promise<AboutUsHero | null> {
  try {
    const entries = await client.getEntries({
      content_type: 'aboutUsHero',
      limit: 1
    });

    if (entries.items.length === 0) return null;

    const entry = entries.items[0] as any;
    return {
      title: entry.fields.title || '',
      subtitle: entry.fields.subtitle || '',
      backgroundImage: entry.fields.backgroundImage
    };
  } catch (error) {
    console.error('Error fetching about us hero:', error);
    return null;
  }
}

export async function getTraditionalModernSection(): Promise<TraditionalModernSection | null> {
  try {
    const entries = await client.getEntries({
      content_type: 'traditionalModernSection',
      limit: 1
    });

    if (entries.items.length === 0) return null;

    const entry = entries.items[0] as any;
    return {
      title: entry.fields.title || '',
      description: entry.fields.description || '',
      contactLinkText: entry.fields.contactLinkText || 'Contact Us',
      contactLinkUrl: entry.fields.contactLinkUrl || '/contact-us',
      image: entry.fields.image
    };
  } catch (error) {
    console.error('Error fetching traditional modern section:', error);
    return null;
  }
}

// Process Section interfaces
export interface ProcessStep {
  title: string;
  description: string;
  stepNumber: string;
  backgroundColor: 'bg-[#8B572A]' | 'bg-white';
  textColor: 'text-white' | 'text-gray-800';
}

export interface ProcessSection {
  subtitle: string;
  title: string;
  description: string;
  processSteps: ProcessStep[];
}

// Process Section function
export async function getProcessSection(): Promise<ProcessSection | null> {
  try {
    const entries = await client.getEntries({
      content_type: 'processSection',
      limit: 1,
      include: 2 // Include linked process steps
    });

    if (entries.items.length === 0) return null;

    const entry = entries.items[0] as any;
    return {
      subtitle: entry.fields.subtitle || 'How We Work',
      title: entry.fields.title || 'Get Started With Our Process',
      description: entry.fields.description || '',
      processSteps: (entry.fields.processStep || []).map((item: any) => ({
        title: item.fields.title || '',
        description: item.fields.description || '',
        stepNumber: item.fields.stepNumber || '01',
        backgroundColor: item.fields.backgroundColor || 'bg-white',
        textColor: item.fields.textColor || 'text-gray-800'
      }))
    };
  } catch (error) {
    console.error('Error fetching process section:', error);
    return null;
  }
}

export async function getProcessSteps(): Promise<ProcessStep[]> {
  try {
    const entries = await client.getEntries({
      content_type: 'processStep',
      order: ['fields.stepNumber']
    });

    return entries.items.map((entry: any) => ({
      title: entry.fields.title || '',
      description: entry.fields.description || '',
      stepNumber: entry.fields.stepNumber || '01',
      backgroundColor: entry.fields.backgroundColor || 'bg-white',
      textColor: entry.fields.textColor || 'text-gray-800'
    }));
  } catch (error) {
    console.error('Error fetching process steps:', error);
    return [];
  }
}

// Features Section interfaces
export interface FeatureItem {
  title: string;
  description: string;
  icon: string;
  backgroundColor: string;
  textColor: string;
  iconBackgroundColor: string;
}

export interface FeaturesSection {
  subtitle: string;
  title: string;
  description: string;
  features: FeatureItem[];
}

// Features Section functions
export async function getFeaturesSection(): Promise<FeaturesSection | null> {
  try {
    const entries = await client.getEntries({
      content_type: 'featuresSection',
      limit: 1,
      include: 2 // Include linked feature items
    });

    if (entries.items.length === 0) return null;

    const entry = entries.items[0] as any;
    return {
      subtitle: entry.fields.subtitle || 'Features',
      title: entry.fields.title || 'Develop ideas into solutions for your business',
      description: entry.fields.description || '',
      features: (entry.fields.featureItem || []).map((item: any) => ({
        title: item.fields.title || '',
        description: item.fields.description || '',
        icon: item.fields.icon || 'Target',
        backgroundColor: item.fields.backgroundColor || 'bg-white',
        textColor: item.fields.textColor || 'text-gray-800',
        iconBackgroundColor: item.fields.iconBackgroundColor || 'bg-amber-600'
      }))
    };
  } catch (error) {
    console.error('Error fetching features section:', error);
    return null;
  }
}

export async function getFeatureItems(): Promise<FeatureItem[]> {
  try {
    const entries = await client.getEntries({
      content_type: 'featureItem',
      order: ['fields.order']
    });

    return entries.items.map((entry: any) => ({
      title: entry.fields.title || '',
      description: entry.fields.description || '',
      icon: entry.fields.icon || 'Target',
      backgroundColor: entry.fields.backgroundColor || 'bg-white',
      textColor: entry.fields.textColor || 'text-gray-800',
      iconBackgroundColor: entry.fields.iconBackgroundColor || 'bg-amber-600'
    }));
  } catch (error) {
    console.error('Error fetching feature items:', error);
    return [];
  }
}

// Services Hero Section interfaces
export interface ServicesHero {
  title: string;
  subtitle: string;
  backgroundImage?: {
    fields: {
      file: {
        url: string;
      };
    };
  } | null;
}

// Services Hero function
export async function getServicesHero(): Promise<ServicesHero | null> {
  try {
    const entries = await client.getEntries({
      content_type: 'servicesHero',
      limit: 1
    });

    if (entries.items.length === 0) return null;

    const entry = entries.items[0] as any;
    return {
      title: entry.fields.title || '',
      subtitle: entry.fields.subtitle || '',
      backgroundImage: entry.fields.backgroundImage
    };
  } catch (error) {
    console.error('Error fetching services hero:', error);
    return null;
  }
}

// Contact Hero Section interfaces
export interface ContactHero {
  title: string;
  subtitle: string;
  backgroundImage?: {
    fields: {
      file: {
        url: string;
      };
    };
  } | null;
}

// Contact Hero function
export async function getContactHero(): Promise<ContactHero | null> {
  try {
    const entries = await client.getEntries({
      content_type: 'contactHero',
      limit: 1
    });

    if (entries.items.length === 0) return null;

    const entry = entries.items[0] as any;
    return {
      title: entry.fields.title || '',
      subtitle: entry.fields.subtitle || '',
      backgroundImage: entry.fields.backgroundImage
    };
  } catch (error) {
    console.error('Error fetching contact hero:', error);
    return null;
  }
}

// Contact Form Section interfaces
export interface ContactFormSection {
  title: string;
  subtitle: string;
  buttonText: string;
  projectTypeOptions: string[];
}

// Contact Form function
export async function getContactFormSection(): Promise<ContactFormSection | null> {
  try {
    const entries = await client.getEntries({
      content_type: 'contactFormSection',
      limit: 1
    });

    if (entries.items.length === 0) return null;

    const entry = entries.items[0] as any;
    return {
      title: entry.fields.title || 'Get In Touch',
      subtitle: entry.fields.subtitle || 'Say hay to us!',
      buttonText: entry.fields.buttonText || 'Send Messages',
      projectTypeOptions: entry.fields.projectTypeOptions || []
    };
  } catch (error) {
    console.error('Error fetching contact form section:', error);
    return null;
  }
}

// Office Addresses Section interfaces
export interface OfficeLocation {
  locationName: string;
  isActive: boolean;
  phoneNumbers: string[];
  emailAddress: string;
  officeAddress: string;
}

export interface OfficeAddressesSection {
  subtitle: string;
  title: string;
  locations: OfficeLocation[];
}

// Office Addresses function
export async function getOfficeAddressesSection(): Promise<OfficeAddressesSection | null> {
  try {
    const entries = await client.getEntries({
      content_type: 'officeAddressesSection',
      limit: 1,
      include: 2
    });

    if (entries.items.length === 0) return null;

    const entry = entries.items[0] as any;
    return {
      subtitle: entry.fields.subtitle || 'Addresses',
      title: entry.fields.title || 'Our Office Addresses',
      locations: (entry.fields.locations || []).map((location: any) => ({
        locationName: location.fields.locationName || '',
        isActive: location.fields.isActive || false,
        phoneNumbers: location.fields.phoneNumbers || [],
        emailAddress: location.fields.emailAddress || '',
        officeAddress: location.fields.officeAddress || ''
      }))
    };
  } catch (error) {
    console.error('Error fetching office addresses section:', error);
    return null;
  }
}

export async function getOfficeLocations(): Promise<OfficeLocation[]> {
  try {
    const entries = await client.getEntries({
      content_type: 'officeLocation',
      order: ['fields.order']
    });

    return entries.items.map((entry: any) => ({
      locationName: entry.fields.locationName || '',
      isActive: entry.fields.isActive || false,
      phoneNumbers: entry.fields.phoneNumbers || [],
      emailAddress: entry.fields.emailAddress || '',
      officeAddress: entry.fields.officeAddress || ''
    }));
  } catch (error) {
    console.error('Error fetching office locations:', error);
    return [];
  }
}

// Portfolio Hero Section interfaces
export interface PortfolioHero {
  title: string;
  description: string;
  backgroundImage?: {
    fields: {
      file: {
        url: string;
      };
    };
  } | null;
}

// Portfolio Hero function
export async function getPortfolioHero(): Promise<PortfolioHero | null> {
  try {
    const entries = await client.getEntries({
      content_type: 'portfolioHero',
      limit: 1
    });

    if (entries.items.length === 0) return null;

    const entry = entries.items[0] as any;
    return {
      title: entry.fields.title || '',
      description: entry.fields.description || '',
      backgroundImage: entry.fields.backgroundImage
    };
  } catch (error) {
    console.error('Error fetching portfolio hero:', error);
    return null;
  }
}

// Project interfaces
export interface Project {
  title: string;
  client: string;
  startedOn: string;
  completedOn: string;
  status: 'ongoing' | 'completed';
  description: string;
  image: {
    fields: {
      file: {
        url: string;
      };
    };
  };
}

export interface OngoingProjectsSection {
  sectionTitle: string;
  projects: Project[];
}

// Ongoing Projects functions
export async function getOngoingProjectsSection(): Promise<OngoingProjectsSection | null> {
  try {
    const entries = await client.getEntries({
      content_type: 'ongoingProjectsSection',
      limit: 1,
      include: 2
    });

    if (entries.items.length === 0) return null;

    const entry = entries.items[0] as any;
    return {
      sectionTitle: entry.fields.sectionTitle || 'Ongoing Projects',
      projects: (entry.fields.projects || []).map((project: any) => ({
        title: project.fields.title || '',
        client: project.fields.client || '',
        startedOn: project.fields.startedOn || '',
        completedOn: project.fields.completedOn || '',
        status: project.fields.status || 'ongoing',
        description: project.fields.description || '',
        image: project.fields.image
      }))
    };
  } catch (error) {
    console.error('Error fetching ongoing projects section:', error);
    return null;
  }
}

export async function getOngoingProjects(): Promise<Project[]> {
  try {
    const entries = await client.getEntries({
      content_type: 'project',
      'fields.status': 'ongoing',
      order: ['-fields.startedOn']
    });

    return entries.items.map((entry: any) => ({
      title: entry.fields.title || '',
      client: entry.fields.client || '',
      startedOn: entry.fields.startedOn || '',
      completedOn: entry.fields.completedOn || '',
      status: entry.fields.status || 'ongoing',
      description: entry.fields.description || '',
      image: entry.fields.image
    }));
  } catch (error) {
    console.error('Error fetching ongoing projects:', error);
    return [];
  }
}

export interface CompletedProjectsSection {
  sectionTitle: string;
  projects: Project[];
}

// Completed Projects functions
export async function getCompletedProjectsSection(): Promise<CompletedProjectsSection | null> {
  try {
    const entries = await client.getEntries({
      content_type: 'completedProjectsSection',
      limit: 1,
      include: 2
    });

    if (entries.items.length === 0) return null;

    const entry = entries.items[0] as any;
    return {
      sectionTitle: entry.fields.sectionTitle || 'All Completed Projects',
      projects: (entry.fields.projects || []).map((project: any) => ({
        title: project.fields.title || '',
        client: project.fields.client || '',
        startedOn: project.fields.startedOn || '',
        completedOn: project.fields.completedOn || '',
        status: project.fields.status || 'completed',
        description: project.fields.description || '',
        image: project.fields.image
      }))
    };
  } catch (error) {
    console.error('Error fetching completed projects section:', error);
    return null;
  }
}

export async function getCompletedProjects(): Promise<Project[]> {
  try {
    const entries = await client.getEntries({
      content_type: 'project',
      'fields.status': 'completed',
      order: ['-fields.completedOn']
    });

    return entries.items.map((entry: any) => ({
      title: entry.fields.title || '',
      client: entry.fields.client || '',
      startedOn: entry.fields.startedOn || '',
      completedOn: entry.fields.completedOn || '',
      status: entry.fields.status || 'completed',
      description: entry.fields.description || '',
      image: entry.fields.image
    }));
  } catch (error) {
    console.error('Error fetching completed projects:', error);
    return [];
  }
} 
