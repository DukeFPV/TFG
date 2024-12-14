import FeatureCard from "./FeatureCard";

//!!Componente complicado para implementar de esta forma, alternativa en el archivo ChatSideBarR.tsx

const PromtCards = () => {
  const cardsPromts = [
    '¿Como me puedes ayudar en temas de salud?',
    '¿Como me puedes ayudar para utilizar mi banco?',
    'Necesito que busques en internet algo para mi',
    'Quiero saber en que cosas puedes asistirme'
  ]
  return (
    <div>
      {cardsPromts.map((prompt, index) => 
        <FeatureCard
          icon=''
          title=''
          description='' 
          key={`card-${index}`}
          text={prompt}  
        /> )}
    </div>
  )
}

export default PromtCards;