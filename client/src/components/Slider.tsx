import styled from "styled-components"
import { ArrowBackIosNewSharp, ArrowForwardIosSharp } from "@mui/icons-material"
import { sliderItems } from "../data";
import { mobile } from "../responsive";
import { useState } from "react";

interface ArrowProps {
    direction: string;
}

interface WrapperProps {
    slideIndex: number;
}

interface SlideProps {
    bg: string;
}

interface DataProps {
   
        id: number;
        img: any;
        title: string;
        desc: string;
        bg: string;
    
}

  
  const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    position: relative;
    overflow: hidden;
    ${mobile("small")({ display: "none" })}
  `;
  
  const Arrow = styled.div<ArrowProps>`
    width: 50px;
    height: 50px;
    background-color: #fff7f7;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: ${(props) => props.direction === "left" && "10px"};
    right: ${(props) => props.direction === "right" && "10px"};
    margin: auto;
    cursor: pointer;
    opacity: 0.5;
    z-index: 2;
  `;
  
  const Wrapper = styled.div<WrapperProps>`
    height: 100%;
    display: flex;
    transition: all 0.7s ease;
    transform: translateX(${(props) => props.slideIndex * -100}vw);
  `;
  
  const Slide = styled.div<SlideProps>`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    background-color: #${(props) => props.bg};
    ${mobile("medium")({ flexDirection: "column" })}
    ${mobile("large")({ flexDirection: "column" })}
  `;
  
  const ImgContainer = styled.div`
    height: 100%;
    flex: 1;
    ${mobile("medium")({ height: "50%" })}
    ${mobile("large")({ height: "50%" })}
  `;
  
  const Image = styled.img`
    height: 80%;
    ${mobile("medium")({ height: "100%" })}
    ${mobile("large")({ height: "100%" })}
  `;
  
  const InfoContainer = styled.div`
    flex: 1;
    padding: 50px;
  `;
  
  const Title = styled.h1`
    font-size: 70px;
  `;
  
  const Desc = styled.p`
    margin: 50px 0px;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 3px;
  `;
  
  const Button = styled.button`
    padding: 10px;
    font-size: 20px;
    background-color: transparent;
    cursor: pointer;
  `;
  
  const Slider = () => {
    const [slideIndex, setSlideIndex] = useState(0);
    const handleClick = (direction: string) => {
      if (direction === "left") {
        setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
      } else {
        setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
      }
    };
  
    return (
      <Container>
        <Arrow direction="left" onClick={() => handleClick("left")}>
          <ArrowBackIosNewSharp />
        </Arrow>
        <Wrapper slideIndex={slideIndex}>
          {sliderItems.map((item:DataProps) => (
            <Slide bg={item.bg} key={item.id}>
              <ImgContainer>
                <Image src={item.img} />
              </ImgContainer>
              <InfoContainer>
                <Title>{item.title}</Title>
                <Desc>{item.desc}</Desc>
                <Button>SHOW NOW</Button>
              </InfoContainer>
            </Slide>
          ))}
        </Wrapper>
        <Arrow direction="right" onClick={() => handleClick("right")}>
          <ArrowForwardIosSharp />
        </Arrow>
      </Container>
    );
  };

export default Slider
