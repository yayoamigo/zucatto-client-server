import { Badge } from "@mui/material";
import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";



const Container = styled.div`
  height: 60px;
  ${mobile("small")({ height: "50px" })}
  background-color: #fcecea;
  z-index: 2;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile("small")({ padding: "10px 0px" })}
  height: 100%;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  ${mobile("small")({ paddingRight: "20px" })}
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile("small")({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid  #fcecea;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile("small")({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
  justify-content: center;
`;

const Logo = styled.img`
  width: 80px;
  padding-top: 10px;
  ${mobile("small")({ width: "50px" })}
`;

const LogoText = styled.h1`
  font-size: 20px;
  font-weight: bold;
  color: black;
  ${mobile("small")({ fontSize: "16px" })}
`;


const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile("small")({ flex: 2, justifyContent: "center", paddingRight: "5px" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile("small")({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const quantity = useSelector((state:any) => state.cart.quantity);
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo src="/ze.png" />
         
        </Center>
        <Right>
          <MenuItem>REGISTER</MenuItem>
          <MenuItem>SIGN IN</MenuItem>
          <Link to="/cart">
          <MenuItem>
            <Badge badgeContent={quantity} color="warning">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;