const undoStack: object[] = [];
const redoStack: object[] = [];

interface RestoreState {
  canvas: fabric.Canvas;
  state: object;
}

interface SaveCanvasState {
  canvas: fabric.Canvas | null;
}

interface UndoCanvasStack {
  canvas: fabric.Canvas | null;
}

interface RedoCanvasStack {
  canvas: fabric.Canvas | null;
}

export function saveCanvasState({ canvas }: SaveCanvasState) {
  if (!canvas) return;

  redoStack.length = 0;

  undoStack.push(canvas.toJSON());
}

export function restoreCanvasState({ canvas, state }: RestoreState) {
  if (!canvas || !state) return;

  canvas.clear();

  canvas.loadFromJSON(state, () => {
    canvas.renderAll();
  });
}

export function undoCanvasState({ canvas }: UndoCanvasStack) {
  if (!canvas || undoStack.length < 1) return;

  const poppedState = undoStack.pop();

  if (!poppedState) return;

  redoStack.push(poppedState);

  restoreCanvasState({ canvas, state: poppedState });
}

export function redoCanvasState({ canvas }: RedoCanvasStack) {
  if (!canvas || redoStack.length < 1) return;

  const nextState = redoStack[redoStack.length - 1];

  if (!nextState) return;

  undoStack.push(nextState);
  
  redoStack.pop();

  restoreCanvasState({ canvas, state: nextState });
}
