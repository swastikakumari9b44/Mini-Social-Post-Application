import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const PostSkeleton = () => (
  <Card sx={{ borderRadius: 3, mb: 2.5 }}>
    <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, mb: 1.5 }}>
        <Skeleton variant="circular" width={40} height={40} />
        <Box sx={{ flexGrow: 1 }}>
          <Skeleton variant="text" width="30%" height={20} />
          <Skeleton variant="text" width="15%" height={16} />
        </Box>
      </Box>
      <Skeleton variant="text" width="90%" />
      <Skeleton variant="text" width="60%" sx={{ mb: 1.5 }} />
      <Skeleton variant="rounded" width="100%" height={220} />
    </CardContent>
  </Card>
);

export default PostSkeleton;
