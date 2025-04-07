import Image from 'next/image'

export default function MinisterioHeader() {
  return (
    <div className="flex relative flex-col-reverse md:flex-row-reverse justify-center w-full mb-5">
      <div className="w-full lg:max-w-[400px] md:flex justify-center items-center relative overflow-hidden hidden">
        <div className="absolute inset-0 bg-[url(/img/ministerio.jpg)] bg-cover bg-center blur-sm scale-110 "></div>
        <Image
          src={'/img/ministerio.jpg'}
          height={300}
          width={300}
          priority
          quality={100}
          alt="imagem de agenda"
          className="object-contain w-full h-[200px] md:h-full relative z-10"
        />
      </div>

      <div className="flex flex-col w-full bg-primary text-white justify-center py-5 px-5">
        <h1 className="text-3xl mb-2 font-bold text-center md:text-start">
          Nosso ministério
        </h1>
        <div className="flex flex-col items-start gap-3">
          <div>
            <p className="mb-4">
              A Igreja Alcançados pela Graça é liderada por um ministério
              comprometido com o chamado de Deus, servindo com amor e dedicação
              para guiar a igreja no caminho da fé. Cada membro do ministério
              tem um papel essencial na edificação da igreja e no cumprimento da
              missão que Deus nos confiou.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
