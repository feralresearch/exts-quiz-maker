import { DropTarget } from "react-dnd";
const TargetBox = ({ children, style, canDrop, isOver, connectDropTarget }) => {
  const targetStyle = { active: { opacity: 0.75 }, inactive: {}, ...style };
  const isActive = canDrop && isOver;
  return connectDropTarget(
    <div style={isActive ? targetStyle.active : targetStyle.inactive}>
      {children}
    </div>
  );
};
export default DropTarget(
  (props) => props.accepts,
  {
    drop(props, monitor) {
      if (props.onDrop) {
        props.onDrop(props, monitor);
      }
    },
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  })
)(TargetBox);
