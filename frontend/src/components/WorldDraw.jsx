import world from "../../public/world.png"

const WorldDraw = () => {
  return (
    <>
    <div className="h-100 w-100">
        <img src={world} alt="DrawWorld" className="opacity-50" />
    </div>
    <div className="font-semibold text-[2.5rem] text-white font-['Pacifico']">
        <h2> Conecte-se com seus amigos</h2>
    </div>
    </>
  )
}

export default WorldDraw