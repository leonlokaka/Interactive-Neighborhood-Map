import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ResponsiveAppBar from "./Appbar";
import { Box, BoxProps, Icon } from "@mui/material";
import styled from "@emotion/styled";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface Pointer {
  text: string;
  position: number; // 0 - 100
}

interface HeapmapExplanationProps {
  colorBarWidth?: number;
  colorBarHeight?: number;
  pointerLabelWidth?: number; // min 60
  pointers?: Pointer[];
}

export default function HeapmapExplanation(props: HeapmapExplanationProps) {
  let {
    colorBarWidth = 300,
    colorBarHeight = 30,
    pointerLabelWidth = 60,
    pointers = [],
  } = props;

  const r = React.useRef<any>([]);
  r.current = pointers.map((_, i) => r.current[i] ?? React.createRef());
  pointerLabelWidth = Math.max(pointerLabelWidth, 60);

  const pointerBackgroundColor = "#eee";

  const HeapmapColorBar = styled(Box)((props: BoxProps) => ({
    width: colorBarWidth,
    height: colorBarHeight,
    background: `linear-gradient(
            90deg,
            rgba(79, 220, 74, 1) 0%,
            rgba(208, 222, 33, 1) 33%,
            rgba(255, 154, 0, 1) 66%,
            rgba(255, 0, 0, 1) 100%
        )`,
  }));
  const Pointer = styled(Box)((props: BoxProps) => ({
    position: "absolute",
    // left: 0,
    // top: 0,
    bottom: "14px",
    overflow: "visible",
    width: pointerLabelWidth,
    marginLeft: -pointerLabelWidth / 2,
    backgroundColor: pointerBackgroundColor,
    padding: "5px",
    textAlign: "center",
    borderRadius: "5px",
  }));
  const PointerText = styled(Box)((props: BoxProps) => ({}));
  const PointerArrow = styled(ArrowDropDownIcon)((props: BoxProps) => ({
    position: "absolute",
    bottom: "-35px",
    left: (pointerLabelWidth - 60) / 2,
    fontSize: "60px",
  }));

  const updatePointerRowHeight = React.useCallback(
    function updatePointerRowHeight() {
      const heights = r.current.map(
        (item: { current: { offsetHeight: any } }) =>
          item && item.current ? item.current.offsetHeight : 0
      );
      return Math.max(...heights);
    },
    [r]
  );

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        colorBarWidth: "fit-content",
        paddingX: pointerLabelWidth / 2 + 20 + "px",
        paddingY: "20px",
      }}
    >
      <Box
        sx={{
          position: "relative",
          minHeight: 50,
          height: updatePointerRowHeight(),
        }}
      >
        {pointers.map((pointer, index) => (
          <Pointer
            key={index}
            ref={r.current[index]}
            sx={{
              left:
                (Math.max(Math.min(pointer.position, 100), 0) * colorBarWidth) /
                100,
            }}
          >
            <PointerText>{pointer.text}</PointerText>
            <PointerArrow htmlColor={pointerBackgroundColor} />
          </Pointer>
        ))}
      </Box>
      <HeapmapColorBar />
    </Box>
  );
}
