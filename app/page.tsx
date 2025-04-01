import NanoEcosystemWeb from "@/components/nano-ecosystem-web"
import { GithubIcon } from "lucide-react"
import Image from "next/image"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-gray-950 to-black text-white">
      <div className="flex-grow w-full h-[calc(100vh-200px)] md:h-[calc(100vh-220px)] items-center justify-items-center">
        <NanoEcosystemWeb />
      </div>
      <footer className="flex flex-col md:flex-row p-4 text-center text-sm bg-transparent backdrop-blur text-white justify-between items-center gap-4 md:gap-0">
        <div className="flex flex-row items-center justify-center gap-2">
          <p className="pr-1">
            Made with 💙 by{" "}
            <a className="hover:text-sky-600 underline" href="https://github.com/BrazyDevelopment">Brazy</a> at{" "}
            <a className="hover:text-sky-600 underline" href="https://armour.dev">Armour Solutions</a>
          </p>
          <Image
            src={'/logos/armour.png'}
            alt="Armour"
            width={24}
            height={12}
            className="flex-shrink-0"
          />
        </div>
        <div className="flex flex-row items-center justify-center gap-2">
          <GithubIcon className="hover:text-sky-600 w-5 h-5" />
          <p>
            Contribute{" "}
            <a className="hover:text-sky-600 underline" href="https://github.com/BrazyDevelopment/nanomap">Here</a>
          </p>
        </div>
      </footer>
    </main>
  )
}