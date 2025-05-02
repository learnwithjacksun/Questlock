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
};
type Data = {
  id: string;
  key: string;
  value: string;
};

interface DecryptProps {
  isOpen: IsOpen;
  setIsOpen: React.Dispatch<React.SetStateAction<IsOpen>>;
  data: Models.Document;
}

interface NewProps {
  isOpen: IsOpen;
  setIsOpen: React.Dispatch<React.SetStateAction<IsOpen>>;
  data?: Models.Document;
  id: string;
  secret: string;
}
interface DeleteProps {
  isOpen: IsOpen;
  setIsOpen: React.Dispatch<React.SetStateAction<IsOpen>>;
  data: Models.Document;
}
interface DeleteVaultProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}

type SecurityFormData = {
  passcode: string;
  securityQuestion: string;
  answer: string;
};

type Fetching = {
  items: boolean;
  values: boolean;
};

interface DataContextTypes {
  items: Models.Document[];
  values: Models.Document[];
  isCreating: boolean;
  isFetching: Fetching;
  createItem: (title: string, ownerId: string) => Promise<void>;
  createValue: (itemId: string, key: string, value: string) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
}

interface AuthContextType {
  user: Models.Document;
  currentUser: Models.User<Models.Preferences> | null;
  sendOTP: (email: string) => Promise<void>;
  verifyOTP: (userId: string, otp: string, email: string) => Promise<void>;
  isCheckingAuth: boolean;
  loading: boolean;
  createSecurity: (id: string, data: SecurityFormData) => Promise<void>;
  logout: () => Promise<void>;
  editName: (name: string) => Promise<void>;
  isEditing: boolean;
}
