import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Markdown from './Markdown';
import FeaturedPost from "./FeaturedPost";
import React from "react";

const useStyles = makeStyles((theme) => ({
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  },
}));

interface Props {
    posts: Array<any>;
    title: string;
}

export default function Main(props: Props) {
  const classes = useStyles();
  const { posts, title } = props;

  return (
    <Grid item xs={12} md={8}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />
      {
          posts.map((post) => { return <FeaturedPost key={post.title} post={post} />;})
      }
    </Grid>
  );
}