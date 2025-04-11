import Image from 'next/image'

export default function AgendaHeader() {
  return (
    <div className="flex md:flex-row justify-center  mb-5 flex-col-reverse w-full">
      <div className="w-full lg:max-w-[400px] md:flex justify-center items-center relative overflow-hidden hidden">
        <div className="absolute inset-0 bg-[url(/img/agenda2.png)] bg-cover bg-center blur-sm scale-110"></div>
        <Image
          src={'/img/agenda2.png'}
          height={300}
          width={300}
          priority
          quality={100}
          alt="imagem de agenda"
          className="object-contain w-full h-full  relative z-10"
        />
      </div>

      <div className="flex flex-col w-full bg-primary text-white justify-center py-5 px-5">
        <h1 className="text-3xl mb-2 font-bold text-center md:text-start">
          Acompanhe nossa agenda
        </h1>
        <div className="flex flex-col items-start gap-3">
          <div>
            <p className="mb-4">
              Nossa igreja está sempre de portas abertas para receber você!
              Fique por dentro dos dias de culto, eventos especiais e momentos
              de comunhão. Cada encontro é uma oportunidade de crescer na fé e
              fortalecer os laços com Deus e com a comunidade.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
