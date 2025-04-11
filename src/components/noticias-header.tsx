import Image from 'next/image'

export default function NoticiasHeader() {
  return (
    <div className="flex relative flex-col-reverse md:flex-row-reverse justify-center w-full mb-5">
      <div className="w-full lg:max-w-[400px] md:flex justify-center items-center relative overflow-hidden hidden">
        <div className="absolute inset-0 bg-[url(/img/noticias.png)] bg-cover bg-center blur-sm scale-110"></div>
        <Image
          src={'/img/noticias.png'}
          height={300}
          width={300}
          priority
          quality={100}
          alt="imagem de notícias"
          className="object-contain w-full h-[200px] md:h-full relative z-10"
        />
      </div>

      <div className="flex flex-col w-full bg-primary text-white justify-center py-5 px-5">
        <h1 className="text-3xl mb-2 font-bold text-center md:text-start">
          Notícias
        </h1>
        <div className="flex flex-col items-start gap-3">
          <div>
            <p className="mb-4">
              Fique por dentro das novidades da Igreja Alcançados pela Graça!
              Nesta área você encontra notícias, comunicados, eventos futuros e
              tudo o que está acontecendo em nossas congregações. Acompanhe e
              esteja sempre informado!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
