"use client";
import { useDrag, useDrop } from "react-dnd";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";


export default function DraggableCard({
  title,
  id,
  position,
  moveCard,
  image_url,
  openOverlay,
}) {
  const [imageLoading, setImageLoading] = useState(true);

  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: { id, position },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "CARD",
    hover: (item) => {
      if (item.position !== position) {
        moveCard(item.position, position);
        item.position = position;
      }
    },
  });

  return (
    <Card
      ref={(node) => drag(drop(node))}
      className={cn(isDragging ? "opacity-50" : "opacity-100")}
    >
      <CardHeader>{title}</CardHeader>
      <CardContent onClick={() => openOverlay(image_url)}>
          <Image
            src={image_url}
            alt={title}
            width={250}
            height={330}
            onLoad={() => setImageLoading(false)}
            className={cn(
              "h-auto w-auto object-cover transition-all hover:scale-105",
              "aspect-[3/4]",
              imageLoading ? 'blur-sm': 'blur-none'
            )}
          />
        
      </CardContent>
    </Card>
  );
}
