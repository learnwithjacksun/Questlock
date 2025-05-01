import { SearchIcon } from "lucide-react";

interface SearchProps {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const Search = ({search, setSearch}: SearchProps) => {
  return (
    <div className="w-full md:h-12 h-11 px-4 rounded-lg border border-line focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-background focus-within:ring-2 transition-all duration-300 ease-in-out flex items-center gap-2">
        <SearchIcon size={20} className="text-muted"/>
        <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-full text-sm font-medium text-main bg-transparent"
        />
    </div>
  )
}

export default Search