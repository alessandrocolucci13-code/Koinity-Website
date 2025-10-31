import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface FiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  city: string;
  onCityChange: (value: string) => void;
  genre: string;
  onGenreChange: (value: string) => void;
}

export function Filters({
  search,
  onSearchChange,
  city,
  onCityChange,
  genre,
  onGenreChange,
}: FiltersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Cerca film..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
          data-testid="input-search"
        />
      </div>

      <Select value={city} onValueChange={onCityChange}>
        <SelectTrigger data-testid="select-city">
          <SelectValue placeholder="Tutte le città" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tutte le città</SelectItem>
          <SelectItem value="Milano">Milano</SelectItem>
          <SelectItem value="Roma">Roma</SelectItem>
          <SelectItem value="Torino">Torino</SelectItem>
          <SelectItem value="Firenze">Firenze</SelectItem>
          <SelectItem value="Bologna">Bologna</SelectItem>
          <SelectItem value="Napoli">Napoli</SelectItem>
        </SelectContent>
      </Select>

      <Select value={genre} onValueChange={onGenreChange}>
        <SelectTrigger data-testid="select-genre">
          <SelectValue placeholder="Tutti i generi" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tutti i generi</SelectItem>
          <SelectItem value="Drammatico">Drammatico</SelectItem>
          <SelectItem value="Commedia">Commedia</SelectItem>
          <SelectItem value="Documentario">Documentario</SelectItem>
          <SelectItem value="Thriller">Thriller</SelectItem>
          <SelectItem value="Fantascienza">Fantascienza</SelectItem>
          <SelectItem value="Horror">Horror</SelectItem>
          <SelectItem value="Classico">Classico</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
