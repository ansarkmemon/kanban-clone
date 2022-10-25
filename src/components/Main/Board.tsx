import { Box, Grid, GridItem } from "@chakra-ui/react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useWorkspaceContext } from "../../contexts/WorkspaceContext";
import { Column } from "./Column";

export const Board: React.FC = () => {
  const { board, isBoardLoading, onTaskMove } = useWorkspaceContext();

  // @TODO: Loader
  if (isBoardLoading && !board.length) return <div>Loadin...</div>;

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;
    onTaskMove(source, destination, draggableId);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box marginY={4}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <Box
              display="flex"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <Grid
                width="100%"
                templateColumns={`repeat(${board.length}, 1fr)`}
                gap={6}
                maxWidth="1300px"
              >
                {board.map((column, idx) => (
                  <GridItem maxWidth="300px" key={column.id}>
                    <Column column={column} />
                  </GridItem>
                ))}
              </Grid>
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </Box>
    </DragDropContext>
  );
};
