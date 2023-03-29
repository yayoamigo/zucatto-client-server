import { useSelect } from "@mui/base";
import { Add, Remove } from "@mui/icons-material";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useRef } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userRequest } from "../requestMethods";



const Container = styled.div``;

type ButtonType = "button" | "submit" | "reset" | "filled";


interface TopButtonProps {
    buttonType: ButtonType;
}

interface SummaryProps {
    cartType : "total" | null;
}



const Wrapper = styled.div`
  padding: 20px;
  ${mobile("small")({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button<TopButtonProps>`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.buttonType === "filled" && "none"};
  background-color: ${(props) =>
    props.buttonType === "filled" ? "black" : "transparent"};
  color: ${(props) => props.buttonType === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile("small")({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile("small")({ flexDirection: "column" })}

`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile("small")({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid black;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile("small")({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile("small")({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div<SummaryProps>`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.cartType === "total" && "500"};
  font-size: ${(props) => props.cartType === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const cart = useSelector((state: any) => state.cart);
  const stripeRef = useRef(null);
  const [stripeToken, setStripeToken] = useState<any>(null);
  const navigate = useNavigate();

  const onToken = (token: any) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      if (stripeToken) {
        const res = await userRequest.post("checkout/payment", {
          tokenId: stripeToken.id,
          amount: 500,
        });
        navigate("/sucess", {
          state: {
            stripeData: res.data,
            products: cart,
          },
        });
      } 
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, navigate]);

  const handleStripeClick = () => {
    if (stripeRef && stripeRef.current) {
      // @ts-ignore
      stripeRef.current.onClick();
    }
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton buttonType="filled">CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton buttonType="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
        <Info>
            {cart.products.map((product:any) => (
              <Product>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>Size:</b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Add />
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <Remove />
                  </ProductAmountContainer>
                  <ProductPrice>
                    $ {product.price * product.quantity}
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
           
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem cartType={null}>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>{`$${cart.total}`}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem cartType={null}>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem cartType={null}>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem cartType="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>{`$${cart.total}` }</SummaryItemPrice>
            </SummaryItem>
            <Button onClick={handleStripeClick}>CHECKOUT NOW</Button>
            <div style={{ display: "none" }}>
            <StripeCheckout
              ref={stripeRef}
              name="ZUCATTO"
              image="https://cdn.freebiesupply.com/images/large/2x/starbucks-logo-png-transparent.png"
              billingAddress
              shippingAddress
              description={`Your total is $${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey="pk_test_51Mod09LrxFSQiNWmpmsPzbCBR5jmspHARy2uUzo3L1b9wmROF5sWZFtMlyhpDthfrOcV4SY5T5xa0JZ4zwow1530005SyRbacL"
            />
            </div>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;