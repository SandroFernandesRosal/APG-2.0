import Image from 'next/image'

export default function DoacaoHeader() {
  return (
    <div className="flex flex-col md:flex-row-reverse justify-center  mb-5 w-full">
      <div className="w-full lg:max-w-[400px] md:flex justify-center items-center relative overflow-hidden hidden">
        <div className="absolute inset-0 bg-[url(/img/doacao.png)] bg-cover bg-center blur-sm scale-110"></div>
        <Image
          src={'/img/doacao.png'}
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
          Contribua com Amor e Generosidade
        </h1>
        <div className="flex flex-col items-start gap-3">
          <h2 className="text-xl italic">
            &quot;Cada um dê conforme determinou em seu coração, não com pesar
            ou por obrigação, pois Deus ama quem dá com alegria.&quot; 2
            Coríntios 9:7
          </h2>

          <div>
            <p className="mb-4">
              A doação é um ato voluntário de fé e gratidão. Quando
              contribuímos, participamos da obra de Deus, permitindo que Sua
              mensagem alcance mais vidas e que a igreja cumpra sua missão.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
