import Image from 'next/image'

export default function EnderecosHeader() {
  return (
    <div className="flex relative flex-col-reverse md:flex-row-reverse justify-center w-full mb-5">
      <div className="w-full lg:max-w-[400px] md:flex justify-center items-center relative overflow-hidden hidden">
        <div className="absolute inset-0 bg-[url(/img/enderecos.png)] bg-cover bg-center blur-sm scale-110"></div>
        <Image
          src={'/img/enderecos.png'}
          height={300}
          width={300}
          priority
          quality={100}
          alt="imagem de endereços"
          className="object-contain w-full  h-full relative z-10"
        />
      </div>

      <div className="flex flex-col w-full bg-primary text-white justify-center py-5 px-5">
        <h1 className="text-3xl mb-2 font-bold text-center md:text-start">
          Nossos Endereços
        </h1>
        <div className="flex flex-col items-start gap-3">
          <p className="mb-2">
            A Igreja Alcançados pela Graça está presente em três locais
            diferentes, levando a Palavra de Deus e acolhendo vidas com amor e
            fé. Confira os endereços e participe conosco:
          </p>
        </div>
      </div>
    </div>
  )
}
