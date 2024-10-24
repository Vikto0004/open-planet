import Image from "next/image";

import { imagesProject } from "../AboutProject/dataBombShelter";

import css from "./AboutProjectImagesList.module.css";

export default function AboutProjectImagesList() {
  return (
    <ul className={css.list}>
      {imagesProject.map((image, index) => (
        <li key={index}>
          <Image
            width={400}
            height={400}
            src={image}
            className={css.image}
            // layout="intrinsic"
            alt="about project image"
          />
        </li>
      ))}
    </ul>
  );
}
