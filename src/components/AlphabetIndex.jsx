export default function AlphabetIndex({ onLetterClick }) {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

  return (
    <div className="flex flex-wrap justify-center gap-1 md:gap-2 mb-4">
      {letters.map(letter => (
        <button
          key={letter}
          onClick={() => onLetterClick(letter)}
          className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-dark-leather text-cream-paper border-2 border-brass-gold rounded font-bold font-mono hover:bg-rich-brown transition-colors text-sm md:text-base"
        >
          {letter}
        </button>
      ))}
    </div>
  )
}

