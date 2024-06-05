import React from "react";

import PhotoEditor from "@/components/canvas_editor/CanvasEditor";

const Home = () => {
  return (
    <div className="flex">
      <div className="flex-[3] flex items-center justify-center">
        <PhotoEditor />
      </div>
      <div className="flex-[1]">Right</div>
    </div>
  );
};

export default Home;
