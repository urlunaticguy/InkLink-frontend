import React, { useState, useEffect } from "react";
import { Box, Grid, Paper } from "@mui/material";
import { Pagination } from "@mui/material";
import styles from "@/styles/components/ImageSlideShow.module.css";
import { styled } from "@mui/material/styles";

const slides = [
  {
    imageUrl: "https://picsum.photos/500/300",
    text: "Connecting writers, agencies, and clients worldwide",
  },
  {
    imageUrl: "https://picsum.photos/600/300",
    text: `"Access to a wide range of writing jobs", "Guaranteed payment", "Flexible working hours"`,
  },
  {
    imageUrl: "https://picsum.photos/700/300",
    text: `"Access to a pool of talented writers", "Efficient project management tools", "Quality assurance"`,
  },
];

const TransitionPaper = styled(Paper)({
  transition: "opacity 0.5s ease-in-out",
});

const ImageSlideShow = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveSlide((activeSlide + 1) % slides.length);
        setIsTransitioning(false);
      }, 500);
    }, 2500);

    return () => clearInterval(intervalId);
  }, [activeSlide, slides.length]);

  const handleChange = (_, value) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveSlide(value - 1);
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <div className={styles.mainCard}>
      <Box sx={{ width: "100%", height: "100%" }}>
        <Grid container sx={{ height: "100%" }}>
          <Grid item xs={12} sm={12} sx={{ backgroundColor: "green" }}>
            <TransitionPaper
              sx={{
                height: "10rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: isTransitioning ? 0 : 1,
                backgroundColor: "green",
              }}
            >
              <Box sx={{ p: 2 }}>
                <h2 style={{ color: "white" }}>{slides[activeSlide].text}</h2>
              </Box>
            </TransitionPaper>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TransitionPaper
              sx={{
                height: "30rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: isTransitioning ? 0 : 1,
                backgroundColor: "green",
              }}
            >
              <img
                src={slides[activeSlide].imageUrl}
                alt={slides[activeSlide].text}
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            </TransitionPaper>
          </Grid>
        </Grid>
        <Box sx={{ mt: -6, display: "flex", justifyContent: "center" }}>
          <Pagination
            count={slides.length}
            page={activeSlide + 1}
            onChange={handleChange}
            sx={{ "& .Mui-selected": { color: "#ffffff" } }}
          />
        </Box>
      </Box>
    </div>
  );
};

export default ImageSlideShow;
