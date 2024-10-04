import SwiftItem from "../SwiftItem/SwiftItem";

type PropsType = {
  data: {
    id: string;
    title: null | string;
    subTitle: null | string;
    texts: string[];
  }[];
};

export default function SwiftList({ data }: PropsType) {
  return (
    <ul>
      {data.map((objectData) => {
        return <SwiftItem key={objectData.id} data={objectData} />;
      })}
    </ul>
  );
}
