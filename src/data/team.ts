export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  image: string;
  email?: string;
  github?: string;
  linkedin?: string;
  instagram?: string;
  isFounder?: boolean;
}

/** Replace image paths with your photos in /public/team/ (e.g. /team/emmanuel.jpg) */
export const teamMembers: TeamMember[] = [
  {
    id: "sanderson-stephen",
    name: "Sanderson Stephen",
    position: "CTO / Assistant Videographer",
    bio: "Supports technology leadership and assists with video production for Endless Infinity Properties.",
    image: "/uploads/team/sanderson-stephen.png",
    email: "Sandersonstephen3@gmail.com",
    github: "https://github.com/DeanAndie",
    linkedin: "https://www.linkedin.com/in/sanderson-stephen-67673323b",
    instagram: "https://www.instagram.com/Ds_anderson7",
  },
  {
    id: "william-bosworth",
    name: "William Bosworth",
    position: "Marketing & Content / Chief Videographer",
    bio: "Leads visual storytelling, marketing content, and video production for Endless Infinity Properties.",
    image: "/uploads/team/william-bosworth.jpeg",
    email: "williambosworth420@gmail.com",
    github: "https://github.com/PrimeWill737",
    linkedin: "https://www.linkedin.com/in/william-bosworth-8514631b2",
    instagram: "https://www.instagram.com/william_bosworthh",
  },
  {
    id: "blessing-matthias",
    name: "Blessing Matthias",
    position: "Client Relations",
    bio: "Ensures every client receives timely updates, support, and a smooth experience.",
    image: "/uploads/team/blessing-matthias.png",
    github: "https://github.com/Nachi-bl",
    instagram: "https://www.instagram.com/bless_nachi",
  },
];
