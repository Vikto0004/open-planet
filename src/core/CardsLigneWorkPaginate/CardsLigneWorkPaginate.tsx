import ReactPaginate from "react-paginate";

type PropsType = {
  totalPages: number;
  onPageChange: () => void;
};

export default function CardsLigneWorkPaginate({
  totalPages,
  onPageChange,
}: PropsType) {
  return (
    <ReactPaginate
      previousLabel={"Previous"}
      nextLabel={"Next"}
      breakLabel={"..."}
      pageCount={totalPages}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={onPageChange}
      containerClassName={"pagination"}
      activeClassName={"active"}
    />
  );
}
