import { libraries } from "@/Constants/data"

const Libraries = () => {
  return (
    <div className="flex flex-col gap-2 py-5">
    <h3 className="text-2xl font-sora font-bold text-center">Libraries</h3>
    <ul className="flex justify-center items-center flex-wrap gap-2">
      {libraries.map((library) => (
        <li
          key={library}
          className="bg-secondary rounded-lg px-4 py-2 border border-line text-sm"
        >
          {library}
        </li>
      ))}
    </ul>
  </div>
  )
}

export default Libraries