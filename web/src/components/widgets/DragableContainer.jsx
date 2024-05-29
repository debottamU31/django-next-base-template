"use client";
import { useState } from "react";
import DraggableCard from "./DragableCard";
import Overlay from "./Overlay";
import update from "immutability-helper";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function DragableContainer({ initialData }) {
  const [cards, setCards] = useState(initialData);

  const [overlayImage, setOverlayImage] = useState(null);

  const openOverlay = (image) => {
    setOverlayImage(image);
  };

  const closeOverlay = () => {
    setOverlayImage(null);
  };

  const moveCard = (fromPosition, toPosition) => {
    const updatedCards = [...cards];
    const fromIndex = updatedCards.findIndex(
      (card) => card.position === fromPosition
    );
    const toIndex = updatedCards.findIndex(
      (card) => card.position === toPosition
    );

    // Swap positions
    [updatedCards[fromIndex], updatedCards[toIndex]] = [
      updatedCards[toIndex],
      updatedCards[fromIndex],
    ];

    console.log(updatedCards)

    setCards(updatedCards);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <>
        <div className="grid grid-cols-3 gap-4">
          {cards.map((card, index) => (
            <DraggableCard
              key={card.type}
              id={card.id}
              position={card.position}
              {...card}
              moveCard={moveCard}
              openOverlay={openOverlay}
            />
          ))}
        </div>
        {overlayImage && <Overlay image={overlayImage} onClose={closeOverlay}/>}
      </>
    </DndProvider>
  );
}
