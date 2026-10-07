/** Splits a short heading into letters for per-letter motion. Screen readers
 *  get the whole word from the parent's aria-label; the letters are hidden. */
export default function Chars({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((word, w, words) => (
        <span className="word" key={w} aria-hidden="true">
          {[...word].map((c, i) => (
            <span className="char" key={i}>
              {c}
            </span>
          ))}
          {w < words.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}
