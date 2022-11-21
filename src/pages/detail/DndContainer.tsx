import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const DndContainer = ({ plan, setPlan }: any) => {
    const handleChange = (result: any) => {
        if (!result.destination) return;
        const items = [...plan];
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setPlan(items);
    };

    const removePath = (title: string) => {
        const copy = JSON.parse(JSON.stringify(plan));
        const result = copy.filter((a: any) => {
            return a.title !== title;
        });
        setPlan(result);
    };
    return (
        <DragDropContext onDragEnd={handleChange}>
            <Droppable droppableId="cardlists">
                {(provided) => (
                    <ul className="list__route" {...provided.droppableProps} ref={provided.innerRef}>
                        {plan.map((e: any, i: number) => (
                            <Draggable draggableId={`test-${i}`} index={i} key={`test-${i}`}>
                                {(provided, snapshot) => {
                                    return (
                                        <li
                                            className="list__item"
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            ref={provided.innerRef}
                                        >
                                            <div className="box__flex">
                                                <div className="icon__sort">
                                                    <span className="for-a11y">정렬</span>
                                                </div>
                                                <div className="icon__number">{i + 1}</div>
                                                <div className="box__desc">
                                                    <h3 className="text__title">{e.title}</h3>
                                                    <div className="text__address">{e.address}</div>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="button button3"
                                                    onClick={() => {
                                                        removePath(e.title);
                                                    }}
                                                >
                                                    제거
                                                </button>
                                            </div>
                                        </li>
                                    );
                                }}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
    );
};
export default DndContainer;
