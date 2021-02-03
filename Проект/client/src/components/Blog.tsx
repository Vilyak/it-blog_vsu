import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';
import 'react-awesome-slider/dist/styles.css';
import {BlogStore, FilteredPosts, Post} from '../types';
import {useSelector} from "react-redux";
import React, {useCallback, useMemo, useState} from "react";
import {getFilteredPosts} from "../utils";
import Login from "./Login";
import {AdminPanel} from "./AdminPanel";
import PostViewer from "./PostViewer";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const sidebar = {
  title: 'О сайте',
  description: 'Блог о самых интересных новостях в мире IT',
  archives: [],
  social: [
    { name: 'GitHub', icon: GitHubIcon, link: "https://github.com/Vilyak"},
    { name: 'VK', icon: GitHubIcon , link: "https://vk.com/vilyakk"},
  ],
};

export default function Blog() {
  const classes = useStyles();
  const {posts, categories, isOpenAdminPanel, isAuthed, openPostState} = useSelector((store: BlogStore) => store);
  const {currentPost, isOpenPost} = openPostState;
  const [category, setCategory] = useState<string>("None");

  const postsData: FilteredPosts = useMemo(() => {
    if (category === "None"){
      return getFilteredPosts(posts);
    }
    else {
      return getFilteredPosts(posts.filter(x => x.category === category));
    }
  }, [posts, category])

  const handlerClickOnCategory = useCallback((categoryName: string) => {
    setCategory(category === categoryName ? "None" : categoryName);
  }, [category, setCategory]);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="IT Блог" sections={categories} onClickCategory={handlerClickOnCategory}/>
        {
          !(isOpenAdminPanel && isAuthed) ?


              !isOpenPost ?
              <main>
            {postsData.mainFeaturedPost ? <MainFeaturedPost post={postsData.mainFeaturedPost} /> : null}
            <Grid container spacing={4}>
              {postsData.featuredPosts.map((post) => (
                  <FeaturedPost key={post.title} post={post} />
              ))}
            </Grid>
            <Grid container spacing={5} className={classes.mainGrid}>
              <Main title="Другие статьи" posts={postsData.posts} />
              <Sidebar
                  title={sidebar.title}
                  description={sidebar.description}
                  archives={sidebar.archives}
                  social={sidebar.social}
              />
            </Grid>
          </main> : <PostViewer post={currentPost}/>
              : <AdminPanel/>
        }
      </Container>
      <Footer title="IT БЛОГ" description="Author DMITRY VELICHKO" />
      <Login/>
    </>
  );
}
