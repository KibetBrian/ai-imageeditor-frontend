import { useState } from "react";

const useStack = () => {
  const [undoStack, setUndoStack] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);

  const pushToUndoStack = (data: string) => {
    setUndoStack((prev) => [...prev, data]);
  };

  const pushToRedoStack = (data: string) => {
    setRedoStack((prev) => [...prev, data]);
  };

  const popUndo = () => {
    const data = undoStack.pop();

    if (data) {
      pushToRedoStack(data);
    }

    return data;
  };

  const popRedo = () => {
    const data = redoStack.pop();

    if (data) {
      pushToUndoStack(data);
    }

    return data;
  };

  const clearStack = () => {
    setUndoStack([]);
    setRedoStack([]);
  };

  const isUndoEmpty = () => {
    return undoStack.length === 0;
  };

  const isRedoEmpty = () => {
    return redoStack.length === 0;
  };

  const peekUndo = () => {
    return undoStack[undoStack.length - 1];
  };

  const getUndoStackLength = () => {
    return undoStack.length;
  };

  return {
    pushToUndoStack,
    popUndo,
    popRedo,
    clearStack,
    isUndoEmpty,
    isRedoEmpty,
    peekUndo,
    getUndoStackLength,
  };
};

export default useStack;
