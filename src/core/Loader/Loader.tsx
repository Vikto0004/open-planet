import { BarLoader } from "react-spinners";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255, 255, 255, 1)",
        zIndex: 9999,
      }}
    >
      <BarLoader color="#f5a749" width={400} />
    </div>
  );
};

export default Loader;
