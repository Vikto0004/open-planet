import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div>navigation</div>
      {children}
    </div>
  );
};

export default layout;
