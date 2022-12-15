import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import axios from "axios";

const DndContainer = ({ plan, setPlan }: any) => {
    const handleChange = async (result: any) => {
        if (!result.destination) return;
        const items = [...plan];
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setPlan(items);

        await axios({
            method: "POST",
            url: "https://localhost:8000/plan/change",
            params: {
                plan: items,
            },
        }).then((res) => {
            console.log(res);
        });
    };

    const removePath = async (title: string) => {
        const copy = JSON.parse(JSON.stringify(plan));
        const { planId } = copy[0];
        let deleteData;
        const result = copy.filter((e: any, i: number) => {
            if (e.title == title) {
                deleteData = e.title;
            }
            return e.title !== title;
        });
        await axios({
            method: "POST",
            url: "https://localhost:8000/plan/delete",
            params: {
                planId,
                title: deleteData,
            },
        });
        setPlan(result);
    };

    if (plan.length === 0) {
        return (
            <ul className="list__route">
                <li className="list__item">여행경로가 없습니다 추가 해주세요</li>
            </ul>
        );
    }

    return (
        <>
            <DragDropContext onDragEnd={handleChange}>
                <Droppable droppableId="cardlists">
                    {(provided) => (
                        <ul className="list__route" {...provided.droppableProps} ref={provided.innerRef}>
                            {plan.map((e: any, i: number) => (
                                <Draggable draggableId={`plan-${i}`} index={i} key={`plan-${i}`}>
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
                                                        onClick={() => removePath(e.title)}
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
        </>
    );
};
export default DndContainer;
