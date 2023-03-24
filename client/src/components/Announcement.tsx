import styled from "styled-components"
import { mobile } from "../responsive";

const Container = styled.div`
 width: 100%;
 height: 40px;
 display: flex;
 align-items: center;
 background-color: #ee6a4f;
 justify-content: center;
 ${mobile("small")({ display: "none"})}
 ${mobile("medium")({ display: "none"})}
`
const Promo = styled.p`
font-size: 14px;
font-weight: 500;
color: #fff;
${mobile("medium")({ fontSize: "14px"})}
`


export const Anaouncments = () => {
  return (
    <Container>
        <Promo>
            This is the best sale of the month, don't miss this 50% off in every item offer lasting until may 23.
        </Promo>
    </Container>
  )
}

export default Anaouncments;