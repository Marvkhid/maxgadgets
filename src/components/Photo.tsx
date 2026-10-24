import Image from "next/image";
import { photos, type PhotoName } from "@/data/photos";
import { cn } from "@/lib/cn";

interface PhotoProps {
  name: PhotoName;
  className?: string;
  sizes: string;
  priority?: boolean;
  position?: string;
  rounded?: boolean;
}

export function Photo({ name, className, sizes, priority, position = "center", rounded = true }: PhotoProps) {
  const photo = photos[name];
  return (
    <div className={cn("group relative overflow-hidden skeleton-once bg-neutral-100", rounded && "rounded-3xl", className)}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        quality={70}
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
        style={{ objectPosition: position }}
      />
    </div>
  );
}
