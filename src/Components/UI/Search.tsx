import { SearchIcon } from "lucide-react";

interface SearchProps {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const Search = ({search, setSearch}: SearchProps) => {
  return (
    <div className="w-full md:h-12 h-11 px-4 rounded-lg border border-line focus-within:border-primary focus-within:border transition-all duration-300 ease-in-out flex items-center gap-2">
        <SearchIcon/>
        <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-full text-main bg-transparent"
        />
    </div>
  )
}

export default Search