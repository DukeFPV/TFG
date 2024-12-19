import { SignIn } from "@clerk/nextjs"

export default function Page() {
  return (
    <div className="flex flex-1 min-h-[70vh] w-auto items-center justify-center align-middle">
      <SignIn />
    </div>
  )
}
