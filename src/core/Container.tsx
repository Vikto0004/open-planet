import { ReactNode } from "react";
import SectionContainer from "./SectionContainer/SectionContainer";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <SectionContainer>
      <div>{children}</div>
    </SectionContainer>
  );
};

export default Container;
