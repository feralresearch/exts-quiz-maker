import React from "react";

const StatusToggle = ({
  id,
  parentId,
  name,
  onChange,
  value,
  options = ["YES", "NO"],
}) => {
  return (
    <div
      style={{ color: value ? options.color[0] : options.color[1] }}
      onClick={(e) =>
        onChange({ parentId, id, name, value: !value, originalEvent: e })
      }
    >
      {value ? options.display[0] : options.display[1]}
    </div>
  );
};

export default StatusToggle;
