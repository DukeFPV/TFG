//!! No se implementa en el proyecto

interface PromtButtonsProps {
  text: string
  onClick: () => void
}

const PromtButtons = ({ text, onClick }: PromtButtonsProps) => {
  return (
    <button className="promt-button" onClick={onClick}>
      {text}
    </button>
  )
}

export default PromtButtons
