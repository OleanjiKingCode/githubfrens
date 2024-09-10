import { Handle, Position, type NodeProps } from "@xyflow/react";

import { type PositionLoggerNode } from "./types";

export function PositionLoggerNode({ data }: NodeProps<PositionLoggerNode>) {
  return (
    
    <div
      style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "5px" }}
    >
      {data.label && <div>child {data.label}</div>}

      <Handle
        type="target"
        position={Position.Top}
        id="p1"
        key="p1"
        isConnectable
      />
    </div>
  );
}
