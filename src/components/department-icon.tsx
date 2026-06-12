import {
  ScrollText,
  BookOpen,
  Languages,
  ShieldCheck,
  Globe,
  Landmark,
  Heart,
  Send,
  Flame,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  scroll: ScrollText,
  book: BookOpen,
  languages: Languages,
  shield: ShieldCheck,
  globe: Globe,
  landmark: Landmark,
  heart: Heart,
  send: Send,
  flame: Flame,
};

export function DepartmentIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = ICONS[name] ?? BookOpen;
  return <Icon className={className} aria-hidden />;
}
