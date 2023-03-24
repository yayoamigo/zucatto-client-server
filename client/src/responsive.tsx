import { css } from "styled-components";

const sizes = {
  small: "390px",
  medium: "768px",
  large: "992px",
  extraLarge: "1200px",
};

type MediaSize = keyof typeof sizes;

export const mobile = (size: MediaSize) => (component: any) => css`
  @media only screen and (max-width: ${sizes[size]}) {
    ${component}
  }
`;
