import { Container } from "@/components/ui/container";
import { profile } from "@/content/profile";

export default function Home() {
  return (
    <Container className="py-24">
      <p className="label">{profile.title}</p>
      <h1 className="mt-6 font-serif text-display">{profile.name}</h1>
    </Container>
  );
}
