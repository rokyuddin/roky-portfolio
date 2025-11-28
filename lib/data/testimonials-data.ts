export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  initials: string;
  avatarColor: string;
  date: string;
}

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    quote: "Roky's expertise in React and Next.js transformed our ride-sharing platform. His attention to detail in implementing real-time tracking and payment integration was exceptional. He consistently delivered high-quality code and was proactive in suggesting improvements.",
    author: "Sarah Mitchell",
    role: "Product Manager",
    company: "Miicon Solutions",
    rating: 5,
    initials: "SM",
    avatarColor: "from-blue-500 to-cyan-500",
    date: "October 2024"
  },
  {
    quote: "Working with Roky on the Skinsight project was a fantastic experience. He has a rare combination of technical prowess and design sensibility. The recommendation engine he built is both powerful and user-friendly.",
    author: "David Chen",
    role: "CTO",
    company: "HealthTech Innovations",
    rating: 5,
    initials: "DC",
    avatarColor: "from-purple-500 to-pink-500",
    date: "September 2024"
  },
  {
    quote: "Roky is one of the most reliable frontend developers I've worked with. His ability to translate complex requirements into clean, maintainable code is impressive. He's also great at collaborating with designers and backend teams.",
    author: "Emily Rodriguez",
    role: "Senior UX Designer",
    company: "Miicon Solutions",
    rating: 5,
    initials: "ER",
    avatarColor: "from-green-500 to-emerald-500",
    date: "August 2024"
  },
  {
    quote: "The e-commerce platform Roky developed for us exceeded our expectations. His implementation of Redux for state management and the checkout flow was flawless. He's responsive, professional, and delivers on time.",
    author: "Michael Thompson",
    role: "Founder & CEO",
    company: "Soft24",
    rating: 5,
    initials: "MT",
    avatarColor: "from-orange-500 to-red-500",
    date: "November 2024"
  },
  {
    quote: "Roky's work on our portfolio website was outstanding. The Framer Motion animations he implemented brought our brand to life. His focus on performance optimization ensured lightning-fast load times without compromising on visual appeal.",
    author: "Aslam Ahmed",
    role: "Creative Director",
    company: "AslamCGA",
    rating: 5,
    initials: "AA",
    avatarColor: "from-indigo-500 to-blue-500",
    date: "July 2024"
  },
  {
    quote: "As a backend developer working alongside Roky, I appreciate his clear communication and API integration skills. He asks the right questions and implements features efficiently. His code reviews are thorough and constructive.",
    author: "James Wilson",
    role: "Backend Engineer",
    company: "Miicon Solutions",
    rating: 5,
    initials: "JW",
    avatarColor: "from-teal-500 to-cyan-500",
    date: "June 2024"
  }
];
