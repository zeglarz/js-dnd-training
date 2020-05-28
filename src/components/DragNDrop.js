import React, { useState, useRef } from "react";
import styled from "styled-components";

const DaragNDrop = styled.div`
  padding: 0.5rem;
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(auto-fill, 300px);
  gap: 0.5rem;
  align-items: flex-start;
`;

const DndGroup = styled.div`
  background: #c69e3c;
  border-radius: 5px;
  padding: 0.5rem;
`;

const GroupTitle = styled.div`
  text-align: left;
  margin-bottom: 0.5rem;
`;

const DnDItem = styled.div`
  border-radius: 5px;
  min-height: 150px;
  background: ${({ dragged }) => (dragged ? "#c69e3c" : "#2a9d8f")};
  display: flex;
  justify-content: center;
  align-items: center;
  &:not(:last-of-type) {
    margin-bottom: 0.5rem;
  }
`;

const P = styled.p`
  margin: 0px;
  font-weight: bold;
`;

export default function DragNDrop({ data }) {
  const [list, setList] = useState(data);
  const [dragging, setDragging] = useState(false);
  const dragItem = useRef();
  const dragNode = useRef();

  const handleDragEnd = () => {
    setDragging(false);
    dragNode.current.removeEventListener("dragend", handleDragEnd);
    dragNode.current = null;
    dragItem.current = null;
  };

  const handleDragStart = (e, params) => {
    dragItem.current = params;
    setTimeout(() => setDragging(true), 0);
    dragNode.current = e.target;
    dragNode.current.addEventListener("dragend", handleDragEnd);
  };

  const handleDragEnter = (e, params) => {
    console.log("entering", e.target, params);
    const draggedItem = dragItem.current;
    if (e.target !== dragNode.current) {
      console.log("targets not the same");
      setList((oldList) => {
        let newList = JSON.parse(JSON.stringify(oldList));
        newList[params.groupIdx].items.splice(
          params.itemIdx,
          0,
          newList[draggedItem.groupIdx].items.splice(draggedItem.itemIdx, 1)[0]
        );
        dragItem.current = params;
        return newList;
      });
    }
  };

  return (
    <DaragNDrop>
      {list.map((group, groupIdx) => (
        <DndGroup
          onDragEnter={
            dragging && !group.items.lenght
              ? (e) => handleDragEnter(e, { groupIdx, itemIdx: 0 })
              : null
          }
        >
          <GroupTitle>{group.title}</GroupTitle>
          {group.items.map((item, itemIdx) =>
            dragging &&
            dragItem.current.groupIdx === groupIdx &&
            dragItem.current.itemIdx === itemIdx ? (
              <DnDItem
                dragged
                dragging={dragging}
                key={item}
                draggable
                onDragStart={(e) => handleDragStart(e, { groupIdx, itemIdx })}
                onDragEnter={
                  dragging
                    ? (e) => handleDragEnter(e, { groupIdx, itemIdx })
                    : null
                }
              >
                <P key={item}>{item}</P>
              </DnDItem>
            ) : (
              <DnDItem
                dragging={dragging}
                key={item}
                draggable
                onDragEnter={
                  dragging
                    ? (e) => handleDragEnter(e, { groupIdx, itemIdx })
                    : null
                }
                onDragStart={(e) => handleDragStart(e, { groupIdx, itemIdx })}
              >
                <P key={item}>{item}</P>
              </DnDItem>
            )
          )}
        </DndGroup>
      ))}
    </DaragNDrop>
  );
}
