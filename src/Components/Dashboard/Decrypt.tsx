import { AnimatePresence } from "framer-motion";
import { Modal } from "../UI";
import { Check, Copy, Loader, X } from "lucide-react";
import { useState } from "react";
import { decryptData } from "@/Config/crypto";

const Decrypt = ({ isOpen, setIsOpen, data, secret }: DecryptProps) => {
  const [isDecrypted, setIsDecrypted] = useState(false);
  const [decryptedValue, setDecryptedValue] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDecrypt = async (value: string) => {
    try {
      setIsLoading(true);
      const res = await decryptData(value, secret);
      if (res) {
        setDecryptedValue(res);
        setIsDecrypted(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    try {
      if (!decryptedValue) return null;
      navigator.clipboard.writeText(decryptedValue);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <AnimatePresence>
        {isOpen.decrypt && (
          <Modal
            isOpen={isOpen.decrypt}
            onClose={() => {
              setIsOpen({ ...isOpen, decrypt: false });
              setDecryptedValue("");
              setIsDecrypted(false);
            }}
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
                {isDecrypted && (
                  <div className="border border-line rounded-md space-y-1">
                    <p className="text-xs p-2">Decrypted {data.key}</p>
                    <div className="bg-foreground p-2 flex items-center justify-between">
                      <p className="text-sm">{decryptedValue}</p>
                      <button
                        onClick={handleCopy}
                        className="text-xs bg-secondary rounded-sm h-8 px-2"
                      >
                        {isCopied ? (
                          <Check size={18} className="text-green-500" />
                        ) : (
                          <Copy size={18} className="text-yellow-500" />
                        )}{" "}
                        {isCopied ? "Copied" : "Copy"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="border-t border-line pt-4 mt-4 flex items-center gap-4">
                {!isDecrypted && (
                  <button
                    onClick={() => handleDecrypt(data.value)}
                    className="btn-primary text-xs h-10 px-4 rounded-md"
                  >
                    {isLoading ? (
                      <Loader size={18} className="animate-spin" />
                    ) : (
                      " Decrypt Data"
                    )}
                  </button>
                )}
                <button
                  onClick={() => {
                    setIsOpen({ ...isOpen, decrypt: false });
                    setDecryptedValue("");
                    setIsDecrypted(false);
                  }}
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
  );
};

export default Decrypt;
