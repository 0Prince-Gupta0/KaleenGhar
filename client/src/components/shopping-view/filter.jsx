import { filterOptions } from "@/config";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { ChevronDown, ChevronUp, X } from "lucide-react";

function ProductFilter({ filters = {}, handleFilter }) {
  const [collapsed, setCollapsed] = useState(
  Object.keys(filterOptions).reduce((acc, key) => {
    acc[key] = true; // true = collapsed
    return acc;
  }, {})
);
  const [searchText, setSearchText] = useState({});

  const hasActiveFilters = Object.keys(filters).length > 0;

  function toggleCollapse(key) {
    setCollapsed((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  function clearAllFilters() {
    Object.keys(filters).forEach((section) => {
      filters[section].forEach((value) =>
        handleFilter(section, value)
      );
    });
  }

  return (
    <aside
      className="
        sticky top-24
        h-fit
        bg-white
        border border-[#E6DED1]
        rounded-2xl
        shadow-sm
        overflow-hidden
      "
    >
      {/* ================= HEADER ================= */}
      <div className="px-5 py-4 border-b flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#1F2933]">
          Filters
        </h2>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-[#C9A24D] hover:text-[#B08B3C]"
          >
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {/* ================= FILTER GROUPS ================= */}
      <div className="px-5 py-6 space-y-8">
        {Object.keys(filterOptions).map((key) => {
          const options = filterOptions[key];
          const selectedCount = filters?.[key]?.length || 0;
          const isCollapsed = collapsed[key];

          const filteredOptions = options.filter((opt) =>
            opt.label
              .toLowerCase()
              .includes(searchText[key]?.toLowerCase() || "")
          );

          return (
            <div key={key}>
              {/* SECTION HEADER */}
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleCollapse(key)}
              >
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-[#374151]">
                    {key}
                  </h3>

                  {selectedCount > 0 && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[#C9A24D]/20 text-[#C9A24D] font-medium">
                      {selectedCount}
                    </span>
                  )}
                </div>

                {isCollapsed ? (
                  <ChevronDown className="h-4 w-4 text-[#6B7280]" />
                ) : (
                  <ChevronUp className="h-4 w-4 text-[#6B7280]" />
                )}
              </div>

              {!isCollapsed && (
                <>
                  {/* SEARCH */}
                  {options.length > 5 && (
                    <input
                      type="text"
                      placeholder={`Search ${key}`}
                      value={searchText[key] || ""}
                      onChange={(e) =>
                        setSearchText((prev) => ({
                          ...prev,
                          [key]: e.target.value,
                        }))
                      }
                      className="
                        mt-3 w-full
                        rounded-lg
                        border border-[#E6DED1]
                        px-3 py-2
                        text-sm
                        outline-none
                        focus:border-[#C9A24D]
                      "
                    />
                  )}

                  {/* OPTIONS */}
                  <div className="mt-3 space-y-2">
                    {filteredOptions.map((opt) => {
                      const isChecked =
                        filters?.[key]?.includes(opt.id) || false;

                      return (
                        <label
                          key={opt.id}
                          className="
                            flex items-center gap-3
                            text-sm
                            cursor-pointer
                            rounded-lg
                            px-2 py-1.5
                            transition
                            hover:bg-[#F5EFE6]
                          "
                        >
                          <Checkbox
                            checked={isChecked}
                            onCheckedChange={() =>
                              handleFilter(key, opt.id)
                            }
                          />
                          <span
                            className={`${
                              isChecked
                                ? "font-medium text-[#1F2933]"
                                : "text-[#4B5563]"
                            }`}
                          >
                            {opt.label}
                          </span>
                        </label>
                      );
                    })}

                    {filteredOptions.length === 0 && (
                      <p className="text-xs text-[#9CA3AF] px-2">
                        No options found
                      </p>
                    )}
                  </div>
                </>
              )}

              <Separator className="mt-6" />
            </div>
          );
        })}
      </div>
    </aside>
  );
}

export default ProductFilter;
