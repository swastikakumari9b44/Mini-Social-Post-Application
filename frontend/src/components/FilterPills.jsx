import Box from "@mui/material/Box";

// "All Posts" reflects the real server order. The other filters are applied
// client-side over posts already loaded — none of this claims server-side filtering.
export const FILTERS = ["All Posts", "For You", "Most Liked", "Most Commented"];

const FilterPills = ({ value, onChange }) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        overflowX: "auto",
        pb: 1.5,
        mb: 0.5,
        "&::-webkit-scrollbar": { display: "none" },
        scrollbarWidth: "none",
      }}
    >
      {FILTERS.map((filter) => {
        const selected = value === filter;
        return (
          <Box
            key={filter}
            component="button"
            onClick={() => onChange(filter)}
            sx={{
              flexShrink: 0,
              border: selected ? "none" : "1px solid",
              borderColor: "divider",
              bgcolor: selected ? "primary.main" : "#fff",
              color: selected ? "#fff" : "text.primary",
              borderRadius: 999,
              px: 2.25,
              py: 0.9,
              fontSize: 13.5,
              fontWeight: 700,
              fontFamily: "inherit",
              cursor: "pointer",
              boxShadow: selected ? "none" : "0px 1px 2px rgba(16,24,40,0.05)",
              transition: "background-color 0.15s ease",
            }}
          >
            {filter}
          </Box>
        );
      })}
    </Box>
  );
};

export default FilterPills;
