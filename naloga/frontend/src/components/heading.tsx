// Definicija vmesnika za lastnosti glave
interface HeadingProps {
  title: string; // Naslov
  description: string; // Opis
}

// Komponenta Glava (Heading)
const Heading = ({ title, description }: HeadingProps) => {
  return (
    <div className="mb-4 gap-1 flex flex-col">
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default Heading;
