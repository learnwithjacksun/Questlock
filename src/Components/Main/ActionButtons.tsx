import { useCountStore } from "@/Stores";
const ActionButtons = () => {
    const { increment, decrement } = useCountStore();
  return (
    <>
     <div className="flex gap-2">
          <button
            className="btn-primary w-full rounded-lg px-4 py-2"
            onClick={increment}
          >
            Increment
          </button>
          <button
            className="border border-line rounded-lg px-4 py-2 w-full"
            onClick={decrement}
          >
            Decrement
          </button>
        </div>
    </>
  )
}

export default ActionButtons