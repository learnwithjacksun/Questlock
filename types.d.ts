interface ThemeStore {
    theme: string;
    toggleTheme: () => void;
    fetchTheme: () => void;
}

type IsOpen = {
    decrypt: boolean;
    delete: boolean;
    new: boolean;
    edit: boolean;
    deleteVault: boolean;
  };
  type Data = {
    id: string;
    key: string;
    value: string;
  };
  
  interface DecryptProps {
    isOpen: IsOpen;
    setIsOpen: React.Dispatch<React.SetStateAction<IsOpen>>;
    data: Data;
  }

  interface NewProps {
    isOpen: IsOpen;
    setIsOpen: React.Dispatch<React.SetStateAction<IsOpen>>;
    data?: Data;
  }
  interface DeleteProps {
    isOpen: IsOpen;
    setIsOpen: React.Dispatch<React.SetStateAction<IsOpen>>;
    data: Data;
  }
  interface DeleteVaultProps {
    isOpen: IsOpen;
    setIsOpen: React.Dispatch<React.SetStateAction<IsOpen>>;
    id: string
  }