// --- Material Ui Imports --- //
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { withStyles } from '@mui/styles';

export const FiCard = withStyles({
  root: {
    position: "relative"
  }
})(Card);

export const FiCardActionArea = withStyles({
  root: {
    position: "relative"
  }
})(CardActionArea);

export const FiCardActions = withStyles({
  root: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "#000000",
    height: "10%",
    width: "10%"
  }
})(CardActions);

export const FiCardMedia = withStyles({
  root: {
    position: "relative",
    height: "100%",
    width: "100%"
  }
})(CardMedia);

// --- Exports --- //
export default {
  FiCard,
  FiCardActionArea,
  FiCardActions,
  FiCardMedia
};
