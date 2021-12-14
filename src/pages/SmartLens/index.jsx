import React, { useRef, useEffect, memo } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import "./../../App.css";
import { drawRect } from "../../utils/smartLensUtil";
import { Box } from "@mui/material";

const SmartLens = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const runCoco = async () => {
    const net = await cocossd.load();
    setInterval(() => {
      detect(net);
    }, 20);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
      const obj = await net.detect(video);

      const ctx = canvasRef.current.getContext("2d");

      drawRect(obj, ctx);
    }
  };

  useEffect(() => {
    runCoco();
  }, []);

  return (
    <Box className="App">
      <Box className="App-header">
        <Webcam
          ref={webcamRef}
          muted={true}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            maxWidth: 640,
            maxHeight: 480,
            width: "100%",
            borderRadius: "22px",
            overflow: "hidden",
            WebkitTransform: "translateZ(0)",
            boxShadow:
              "0 19px 51px 0 rgba(0,0,0,0.16), 0 14px 19px 0 rgba(0,0,0,0.07)",
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
            maxWidth: 640,
            maxHeight: 480,
            width: "100%",
          }}
        />
      </Box>
    </Box>
  );
};

export default memo(SmartLens);
