export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  image: string;
  email?: string;
  isFounder?: boolean;
}

/** Replace image paths with your photos in /public/team/ (e.g. /team/emmanuel.jpg) */
export const teamMembers: TeamMember[] = [
  {
    id: "team-1",
    name: "Sarah Bello",
    position: "Real Estate Consultant",
    bio: "Helps clients find verified properties and guides them through every step of the buying process.",
    image: "/images/team-3.jpg",
    email: "endlessinfinity16@gmail.com",
  },
  {
    id: "team-2",
    name: "Michael Adeyemi",
    position: "Software Developer",
    bio: "Builds responsive websites and business applications for clients across Nigeria.",
    image: "/images/team-4.jpg",
    email: "endlessinfinity16@gmail.com",
  },
  {
    id: "team-3",
    name: "Grace Pam",
    position: "Client Relations",
    bio: "Ensures every client receives timely updates, support, and a smooth experience.",
    image: "/images/team-5.jpg",
    email: "endlessinfinity16@gmail.com",
  },
  {
    id: "team-4",
    name: "Daniel Musa",
    position: "Marketing & Content",
    bio: "Creates campaigns and content that connect our brand with investors and property buyers.",
    image: "/images/team-6.jpg",
    email: "endlessinfinity16@gmail.com",
  },
];
