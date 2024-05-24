import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function Home() {
  const [users, setUsers] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      
      const data = await res.json();
      setUsers(data);
    })();
  }, []);
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    const cloneUsers = Array.from(users);
    const [removed] = cloneUsers.splice(startIndex, 1);
    cloneUsers.splice(endIndex, 0, removed);

    setUsers(cloneUsers);
  };
  return (
    <div className="App">
    <h1>Hello React beautifull dnd</h1>
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={users} type="PERSON">
        {(provided) => (
         <div ref={provided.innerRef} {...provided.droppableProps}>
            {users.map((user, index) => {
              return (
                <Draggable
                  key={user.id}
                  draggableId={String(user.id)}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div
                        style={{
                          border: "1px solid red"
                        }}
                      >
                        <h2>{user.name}</h2>
                      </div>
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  </div> 
  );
}
