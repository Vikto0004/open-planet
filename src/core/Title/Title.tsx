import css from './Title.module.css';
import { playfairDisplay } from '../fonts';

export default function Title({ text }: { text: string }) {
  return (
    <h2 className={`${playfairDisplay.className} ${css.title}`}>{text}</h2>
  );
}
