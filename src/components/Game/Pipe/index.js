import React from "react";

import styled from "styled-components";

const Wrap = styled.div`
  &&& {
    left: ${(props) => `${props.pipeX}px !important;`};
    top: ${(props) => `${props.lowerHeight}px !important;`};
    position: absolute !important;
  }
`;

const Rectangle = styled.div`
  display: flex;
  width: 40px;
  height: ${(props) => props.height};
  border-radius: ${(props) =>
    props.up
      ? "0px 0px 50px 50px !important;"
      : "50px 50px 0px 0px !important;"};
  background: ${(props) => props.color || "#FF2D55"};
`;

export default function Pipe({
  upperPipeHeight,
  x,
  bottomPipeTop,
  bottomPipeHeight,
  isHit,
  color,
}) {
  const colors = isHit ? color : "#FF2D55";
  return (
    <div id="pipe">
      <Wrap pipeX={x} lowerHeight={0}>
        <Rectangle
          color={color}
          width={40}
          height={upperPipeHeight}
          fill={{ color: colors }}
          up
        />
      </Wrap>
      <Wrap pipeX={x} lowerHeight={bottomPipeTop}>
        <Rectangle
          color={color}
          width={40}
          height={bottomPipeHeight}
          fill={{ color: colors }}
        />
      </Wrap>
    </div>
  );
}
