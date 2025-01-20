//**Revisado */

// Este componente es una versión de LoadingBubble, que se utiliza para mostrar la animación de carga
const LoadingBubble = (): JSX.Element => {
  return (
    <div
      className="m-2.5 w-[60px] aspect-[4/1] animate-loading"
      style={{
        background: `
          no-repeat radial-gradient(circle closest-side, #383838 90%, #0000) 0 50%,
          no-repeat radial-gradient(circle closest-side, #383838 90%, #0000) 50% 50%,
          no-repeat radial-gradient(circle closest-side, #383838 90%, #0000) 100% 50%
        `,
        backgroundSize: "calc(100%/3) 100%",
      }}
    />
  )
}

export default LoadingBubble

//Código original de aniakubow en freeCodeCamp de YouTube adapatado a TailwindCSS

// .loader {
//   margin: 10px;
//   width: 60px;
//   aspect-ratio: 4;
//   background:
//     no-repeat radial-gradient(circle closest-side, #383838 90%, #0000) 0 50%,
//     no-repeat radial-gradient(circle closest-side, #383838 90%, #0000) 50% 50%,
//     no-repeat radial-gradient(circle closest-side, #383838 90%, #0000) 100% 50%;
//     ;
//   background-size: calc(100%/3) 100%;
//   animation: loading 1s infinite linear;
// }

// @keyframes loading {
//     33% { background-size: calc(100%3) 0, calc(100%/3) 100%, calc(100%/3) 100%; }
//     50% { background-size: calc(100%3) 100%, calc(100%/3) 0, calc(100%/3) 100%; }
//     66% { background-size: calc(100%3) 100%, calc(100%/3) 100%, calc(100%/3) 0; }
// }
