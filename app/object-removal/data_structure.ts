export class UndoRedoStack {
  private redo: Array<any> = [];
  private undo: Array<any> = [];

  public pushUndo(data: any) {
    this.undo.push(data);
  }

  public pushRedo(data: any) {
    this.redo.push(data);
  }

  public popUndo() {
    const data = this.undo.pop();

    if (data) {
      this.pushRedo(data);
    }

    return data;
  }

  public popRedo() {
    const data = this.redo.pop();

    if (data) {
      this.pushUndo(data);
    }

    return data;
  }

  public getUndo() {
    return this.undo;
  }

  public getRedo() {
    return this.redo;
  }

  public clear() {
    this.redo = [];
    this.undo = [];
  }

  public isUndoEmpty() {
    return this.undo.length === 0;
  }

  public isRedoEmpty() {
    return this.redo.length === 0;
  }
}
