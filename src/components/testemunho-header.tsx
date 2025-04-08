import Image from 'next/image'

export default function TestemunhosHeader() {
  return (
    <div className="flex relative flex-col-reverse md:flex-row justify-center w-full mb-5">
      <div className="w-full lg:max-w-[400px] md:flex justify-center items-center relative overflow-hidden hidden">
        <div className="absolute inset-0 bg-[url(/img/testemunho.png)] bg-cover bg-center blur-sm scale-110"></div>
        <Image
          src={'/img/testemunho.png'}
          height={300}
          width={300}
          priority
          quality={100}
          alt="imagem de testemunhos"
          className="object-contain w-full h-[200px] md:h-full relative z-10"
        />
      </div>

      <div className="flex flex-col w-full bg-primary text-white justify-center py-5 px-5">
        <h1 className="text-3xl mb-2 font-bold text-center md:text-start">
          Testemunhos
        </h1>
        <div className="flex flex-col items-start gap-3">
          <div>
            <p className="mb-4">
              Os testemunhos edificam a fé, inspiram corações e mostram o agir
              do Senhor no meio do Seu povo. Se você tem uma história de
              transformação, vitória ou milagre, publique aqui e abençoe outras
              vidas!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
