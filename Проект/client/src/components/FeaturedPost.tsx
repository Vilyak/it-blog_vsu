import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import {getShortDescription} from "../utils";
import {Post} from "../types";
import {useDispatch} from "react-redux";
import {changeViewPostState} from "../actions";

const useStyles = makeStyles({
  card: {
    display: 'flex',
    maxHeight: '255px',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
});

interface Props {
  post: Post;
}

export default function FeaturedPost(props: Props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { post } = props;

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {post.title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {post.date}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {getShortDescription(post.description)}
              </Typography>
              <Typography variant="subtitle1" color="primary" style={{cursor: 'pointer'}} onClick={() => {
                  dispatch(changeViewPostState({state: true, post}));
              }}>
                Продолжить чтение ...
              </Typography>
            </CardContent>
          </div>
          <Hidden xsDown>
            <CardMedia  className={classes.cardMedia} image={post.image} title={post.imageText} />
          </Hidden>
        </Card>
      </CardActionArea>
    </Grid>
  );
}
