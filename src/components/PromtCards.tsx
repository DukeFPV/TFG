import FeatureCard from "./FeatureCard"
import PromtButtons from "./PromtButtons"

//!!Componente complicado para implementar de esta forma, alternativa en el archivo ChatSideBarR.tsx

const PromtCards = ({
  onCardClick,
}: {
  onCardClick: (prompt: string) => void
}) => {
  const cardsPromts = [
    "¿Como me puedes ayudar en temas de salud?",
    "¿Como me puedes ayudar para utilizar mi banco?",
    "Necesito que busques en internet algo para mi",
    "Quiero saber en que cosas puedes asistirme",
  ]
  return (
    <div>
      {cardsPromts.map((prompt, index) => (
        <FeatureCard
          icon=""
          key={`card-${index}`}
          text={prompt}
          onClick={() => onCardClick(prompt)}
        />
      ))}
    </div>
  )
}

export default PromtCards
