import { ChevronLeft, ChevronRight } from 'lucide-react';

const services = [
  {
    title: "Bespoke Furniture & Cabinetry",
    description:
      "Transform your home with custom handcrafted furniture, including wardrobes, storage units, desks, media centers, and display cabinets—designed to fit your space perfectly.",
    icon: "🪑",
    bg: "bg-[#8b572a]",
    textColor: "text-white",
  },
  {
    title: "Kitchen Carpentry Services",
    description:
      "Create your dream kitchen with custom carpentry—handmade cabinets, solid wood worktops, islands, pantries, and tailored storage solutions built just for you.",
    icon: "🍽️",
    bg: "bg-white",
    textColor: "text-black",
  },
  {
    title: "Doors & Windows",
    description:
      "Enhance your home with bespoke internal doors, expert external door and sash window restoration, and custom window frames—complete with quality fittings.",
    icon: "🚪",
    bg: "bg-white",
    textColor: "text-black",
  },
  {
    title: "Architectural Joinery",
    description:
      "Add charm with custom cornices, ceiling roses, and timber mouldings crafted to perfection by experienced joiners.",
    icon: "🛠️",
    bg: "bg-white",
    textColor: "text-black",
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-[#f5f5f0] py-16 relative">
      <div className="absolute right-0 top-0 h-full w-[300px] bg-contain bg-no-repeat bg-right" style={{ backgroundImage: 'url("/Ornament.png")' }} />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <p className="text-[#b46931] font-medium mb-2">Our Services</p>
        <h2 className="text-3xl font-bold text-[#1b1b1b] mb-4">
          Custom Furniture & Interior <br />
          Woodwork Built to Last.
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl">
          Our skilled London joiners combine time-honoured techniques with
          contemporary innovation to deliver
        </p>

        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {services.map((item, idx) => (
            <div
              key={idx}
              className={`min-w-[280px] p-6 rounded-md shadow-sm ${
                item.bg
              } ${item.textColor}`}
            >
              <div className="text-3xl mb-4 bg-white w-10 h-10 rounded-full flex items-center justify-center">{item.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm opacity-80">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-6 top-0 relative z-10 space-x-4">
          <button className="w-10 h-10 rounded-full bg-[#e4cc7f] text-white flex items-center justify-center">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-full bg-[#b49d2f] text-white flex items-center justify-center">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
