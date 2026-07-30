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
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=800&fit=crop",
    email: "endlessinfinity16@gmail.com",
  },
  {
    id: "team-2",
    name: "Michael Adeyemi",
    position: "Software Developer",
    bio: "Builds responsive websites and business applications for clients across Nigeria.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=800&fit=crop",
    email: "endlessinfinity16@gmail.com",
  },
  {
    id: "team-3",
    name: "Grace Pam",
    position: "Client Relations",
    bio: "Ensures every client receives timely updates, support, and a smooth experience.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=800&fit=crop",
    email: "endlessinfinity16@gmail.com",
  },
  {
    id: "team-4",
    name: "Daniel Musa",
    position: "Marketing & Content",
    bio: "Creates campaigns and content that connect our brand with investors and property buyers.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=800&fit=crop",
    email: "endlessinfinity16@gmail.com",
  },
];
