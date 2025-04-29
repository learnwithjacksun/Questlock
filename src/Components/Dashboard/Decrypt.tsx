import { AnimatePresence } from "framer-motion";
import { Modal } from "../UI";
import { Copy, X } from "lucide-react";
import { useState } from "react";



const Decrypt = ({isOpen, setIsOpen, data}: DecryptProps) => {
  const [isDecrypted] = useState(false)
  return (
    <>
    <AnimatePresence>
        {isOpen.decrypt && (
          <Modal
            isOpen={isOpen.decrypt}
            onClose={() => setIsOpen({ ...isOpen, decrypt: false })}
            title="Decrypt Data"
          >
            <div>
              <div className="space-y-2">
                <p className="text-muted">
                  Do you wish to decrypt the value of this item?
                </p>
                <div className="border border-line rounded-md space-y-1">
                  <p className="text-xs p-2">Encrypted {data.key}</p>
                  <p className="bg-foreground text-sm p-2">{data.value}</p>
                </div> 
               {isDecrypted && <div className="border border-line rounded-md space-y-1">
                  <p className="text-xs p-2">Decrypted {data.key}</p>
                  <div className="bg-foreground p-2 flex items-center justify-between">
                    <p className="text-sm">{data.value}</p>
                    <button className="text-xs bg-secondary rounded-sm h-8 px-2">
                      <Copy size={18} className="text-yellow-500"/> Copy
                    </button>
                  </div>
                </div>}
              </div>
              <div className="border-t border-line pt-4 mt-4 flex items-center gap-4">
                {!isDecrypted && <button className="btn-primary text-xs h-10 px-4 rounded-md">
                  Decrypt Data
                </button>}
                <button
                  onClick={() => setIsOpen({ ...isOpen, decrypt: false })}
                  className="border border-line text-xs h-10 px-4 rounded-md"
                >
                  <X size={16} /> Cancel
                </button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  )
}

export default Decrypt