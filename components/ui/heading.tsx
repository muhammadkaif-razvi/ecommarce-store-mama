
interface HedingProps {
  title: string;
  description: string;

}

export const Heading: React.FC<HedingProps> = ({
  title,
  description
}) => {
  return (
    <div className="py-2">
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}