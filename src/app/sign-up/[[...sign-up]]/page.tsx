//**Revisado */

//Registro con Clerk
import { SignUp } from "@clerk/nextjs"

export default function Page() {
  return (
    <div className="flex flex-1 min-h-[70vh] w-auto items-center justify-center align-middle">
      <SignUp />
    </div>
  )
}
