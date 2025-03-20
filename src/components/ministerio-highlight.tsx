import Image from 'next/image'

export default function MinisterioHighlight() {
  return (
    <div className="flex w-[100vw] items-center justify-center place-items-center place-content-center place-self-center   absolute px-5 lg:px-60 md:px-20 -top-24 md:-top-40 ">
      <div className="flex justify-evenly relative   w-[30%] max-w-[500px] md:h-[240px] h-[150px]   flex-col items-center text-center border-l-[1px] border-y-[1px] dark:border-zinc-800  dark:bg-bgdark bg-bglight text-primary border-zinc-400">
        <Image
          src={'/img/igreja3.png'}
          width={500}
          height={240}
          alt="imagem de uma cruz"
          className="w-full h-full object-cover object-center pl-1 py-1 "
        />
        <div className="absolute text-white px-1 ">
          {' '}
          <h1 className="text-lg font-bold  ">Novos Começos</h1>
          <h2>Em Cristo, há sempre esperança</h2>
        </div>
      </div>

      <div className="flex justify-evenly realtive w-[40%] max-w-[680px]  md:h-[340px] h-[200px]  flex-col items-center text-center border-[1px] border-y-[1px] dark:border-zinc-800  dark:bg-bgdark bg-bglight text-primary border-zinc-400">
        <Image
          src={'/img/igreja2.png'}
          width={680}
          height={340}
          alt="imagem de uma cruz"
          className="w-full h-full object-cover object-center p-1"
        />
        <div className="absolute text-white px-1">
          {' '}
          <h1 className="text-lg font-bold">Restauração Divina</h1>
          <h2>Deus transforma todas as coisas</h2>
        </div>
      </div>

      <div className="flex justify-evenly relative  w-[30%] max-w-[500px] md:h-[240px]  h-[150px]  flex-col items-center text-center border-r-[1px] border-y-[1px] dark:border-zinc-800  dark:bg-bgdark bg-bglight text-primary border-zinc-400">
        <Image
          src={'/img/igreja1.png'}
          width={500}
          height={240}
          alt="imagem de uma cruz"
          className="w-[100%] h-full object-cover object-center pr-1 py-1"
        />
        <div className="absolute text-white px-1">
          {' '}
          <h1 className="text-lg font-bold  ">Família em Cristo</h1>
          <h2>Unidos pelo mesmo propósito</h2>
        </div>
      </div>
    </div>
  )
}
