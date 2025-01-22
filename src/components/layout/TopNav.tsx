import useThemeStore from "@/store/theme-store";
import chroma from "chroma-js";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  HelpCircle,
  Search,
  User,
  X,
} from "lucide-react";
import { useState } from "react";

export function TopNav() {
  const { currentTheme, searchQuery, setSearchQuery } = useThemeStore();
  const { parsedColors } = currentTheme;
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className="flex items-center h-12 px-4 border-b"
      style={{
        backgroundColor: parsedColors.menuBg,
        color: parsedColors.textColor,
        borderColor: chroma(parsedColors.textColor).alpha(0.1).css(),
      }}
    >
      {/* Left spacer */}
      <div className="w-60" />

      {/* Center section with navigation, clock and search */}
      <div className="flex-1 flex justify-center items-center">
        <div className="flex items-center gap-1 mr-2">
          <button
            className="p-2 rounded hover:bg-black/10 disabled:opacity-50"
            style={{ color: parsedColors.textColor }}
            disabled
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            className="p-2 rounded hover:bg-black/10 disabled:opacity-50"
            style={{ color: parsedColors.textColor }}
            disabled
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <button
          className="p-2 rounded hover:bg-black/10 mr-2"
          style={{ color: parsedColors.textColor }}
        >
          <Clock className="w-4 h-4" />
        </button>

        <div
          className={`flex items-center w-[720px] h-8 px-3 rounded text-sm relative ${
            isFocused ? "ring-1 ring-white/30" : ""
          }`}
          style={{
            backgroundColor: chroma(parsedColors.textColor).alpha(0.05).css(),
            color: parsedColors.textColor,
          }}
        >
          <Search
            className="w-4 h-4 mr-2 shrink-0"
            style={{ opacity: isFocused ? 1 : 0.5 }}
          />
          <input
            type="text"
            className="flex-1 bg-transparent outline-none placeholder:text-inherit placeholder:opacity-50"
            placeholder="Search Slack Themes"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={{ color: parsedColors.textColor }}
          />
          {searchQuery && (
            <button
              className="p-1 rounded hover:bg-black/10"
              onClick={() => setSearchQuery("")}
            >
              <X className="w-3 h-3 opacity-50" />
            </button>
          )}
        </div>
      </div>

      {/* Right side */}
      <div className="w-60 flex items-center gap-2 justify-end">
        <button
          className="p-2 rounded hover:bg-black/10"
          style={{ color: parsedColors.textColor }}
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        <button
          className="flex items-center gap-2 p-1 rounded hover:bg-black/10"
          style={{ color: parsedColors.textColor }}
        >
          <div className="relative">
            <div className="w-6 h-6 rounded bg-gray-300 overflow-hidden">
              <User className="w-full h-full p-1" />
            </div>
            <div
              className="absolute bottom-0 right-0 w-2 h-2 rounded-full border-2"
              style={{
                backgroundColor: parsedColors.activePresence,
                borderColor: parsedColors.menuBg,
              }}
            />
          </div>
        </button>
      </div>
    </div>
  );
}
